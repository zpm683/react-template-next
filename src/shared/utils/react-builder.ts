/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useMemo } from "react";

import { useMount, useUnmount } from "ahooks";
import { produce } from "immer";
import { create } from "zustand";

// 定义渲染函数参数的类型，包含状态、属性和子节点
type RenderFnArg<S, P, H extends Record<string, any>> = {
  state: S;
  props: P;
  children: React.ReactNode;
  handler: { [K in keyof H]: (event: React.SyntheticEvent) => void };
};
type HandlerFnArg<S, P> = { state: S; props: P };
type UseFnArg<S, P> = { state: S; props: P };

// 生成器接口，定义了构建器的各种方法
interface IReactBuilder<S, P, H extends Record<string, any>> {
  name: string;
  state<K extends keyof S>(key: K, initialValue: S[K]): this;
  props<K extends keyof P>(key: K, defaultValue: P[K]): this;
  handler<K extends string>(
    name: K,
    fn: (
      arg: HandlerFnArg<S, P> & { event: React.SyntheticEvent },
    ) => void | Promise<void>,
  ): IReactBuilder<S, P, H & Record<K, typeof fn>>;
  mount(fn: () => void | Promise<void>): this;
  unmount(fn: () => void | Promise<void>): this;
  ui(renderFn: (arg: RenderFnArg<S, P, H>) => React.ReactNode): this;
  use(fn: (arg: UseFnArg<S, P>) => void): this;
  build(): {
    Component: React.FC<P & { children?: React.ReactNode }>;
    getState: <K extends keyof S>(key: K) => S[K];
    setState: <K extends keyof S>(key: K, nextState: S[K]) => void;
    useStore: <U>(selector: (state: S) => U) => U;
  };
}

const componentInstances = new Map<string, IReactBuilder<any, any, any>>();

/**
 * ReactBuilder (Happy Hacking!)
 * @param name component name
 * @example
 * type AppState = { name: string; age: number; tel: number };
 *type AppProps = { color?: string };
 *
 *const App = ReactBuilder<AppState, AppProps>("App")
 *  .state("name", "hahaha")
 *  .state("age", 1)
 * .props("color", "red")
 * .mount(() => {
 *   console.log("App is Mount");
 * })
 * .use(({ state }) => {
 *   useEffect(() => {
 *     console.log("age is changed");
 *   }, [state.age]);
 * })
 * .ui(({ state, props, children }) => (
 *   <div>
 *     <div style={{ color: props.color }}>name: {state.name}</div>
 *     <div>age: {state.age}</div>
 *     {children}
 *   </div>
 * ))
 * .build();
 *
 *const Child = ReactBuilder("Child1")
 *  .handler("clickBtn", ({ event, props, state }) => {
 *    console.log(event, props, state);
 *    App.setState("age", App.getState("age") + 1);
 *  })
 *  .ui(({ handler }) => {
 *    const age = App.useStore((state) => state.age);
 *    return (
 *      <div>
 *        <div> age: {age}</div>
 *        <button onClick={handler.clickBtn}>change</button>
 *      </div>
 *    );
 *  })
 *  .build();
 *
 *createRoot(document.getElementById("root") as HTMLElement).render(
 *  <App.Component color="blue">
 *    <Child.Component />
 *  </App.Component>,
 *);
 *
 */
const ReactBuilder = <
  S extends Record<string, unknown>,
  P extends Record<string, unknown>,
  H extends Record<string, any> = {},
>(
  name: string,
): IReactBuilder<S, P, H> => {
  if (componentInstances.has(name)) {
    return componentInstances.get(name)!;
  }

  const useStore = create<S>(() => ({}) as S);
  const defaultProps: Partial<P> = {};
  const handlers: Partial<H> = {};

  const uses: ((arg: UseFnArg<S, P>) => void)[] = [];
  const mountEffects: (() => void | Promise<void>)[] = [];
  const unmountEffects: (() => void | Promise<void>)[] = [];

  let renderFn: (arg: RenderFnArg<S, P, H>) => React.ReactNode = () => null;

  const builder: IReactBuilder<S, P, H> = {
    name,
    state(key, initialValue) {
      if (key in useStore.getState()) {
        console.warn(`State key "${String(key)}" is already defined.`);
      }
      useStore.setState((state) => ({ ...state, [key]: initialValue }));
      return this;
    },
    props(key, defaultValue) {
      defaultProps[key] = defaultValue;
      return this;
    },
    handler<K extends string>(
      name: K,
      fn: (
        arg: HandlerFnArg<S, P> & { event: React.SyntheticEvent },
      ) => void | Promise<void>,
    ): IReactBuilder<S, P, H & Record<K, typeof fn>> {
      handlers[name as keyof H] = (async (
        arg: HandlerFnArg<S, P> & { event: React.SyntheticEvent },
      ) => {
        const result = fn(arg);
        if (result instanceof Promise) {
          return await result;
        }
      }) as unknown as H[keyof H];
      return this as unknown as IReactBuilder<S, P, H & Record<K, typeof fn>>;
    },
    use(fn) {
      uses.push(fn);
      return this;
    },
    mount(fn) {
      mountEffects.push(fn);
      return this;
    },
    unmount(fn) {
      unmountEffects.push(fn);
      return this;
    },
    ui(fn) {
      renderFn = fn;
      return this;
    },
    build: () => {
      const Component: React.FC<P & { children?: React.ReactNode }> =
        React.memo(({ children, ...props }) => {
          const state = useStore();
          // eslint-disable-next-line react-hooks/exhaustive-deps
          const combinedProps = { ...defaultProps, ...props } as P;

          uses.forEach((use) => use({ state, props: combinedProps }));

          useMount(() => {
            mountEffects.forEach((effect) => effect());
          });

          useUnmount(() => {
            unmountEffects.forEach((effect) => effect());
          });

          const handlerObj = useMemo(() => {
            return Object.keys(handlers).reduce(
              (acc, key) => {
                acc[key as keyof H] = (event: React.SyntheticEvent) =>
                  handlers[key as keyof H]!({
                    state,
                    props: combinedProps,
                    event,
                  });
                return acc;
              },
              {} as { [K in keyof H]: (event: React.SyntheticEvent) => void },
            );
          }, [state, combinedProps]);

          return renderFn({
            state,
            props: combinedProps,
            children,
            handler: handlerObj,
          });
        });

      const getState = <K extends keyof S>(key: K): S[K] => {
        return useStore.getState()[key];
      };

      const setState = <K extends keyof S>(key: K, nextState: S[K]) => {
        useStore.setState((state) =>
          produce(state, (draft) => {
            // @ts-ignore
            draft[key] = nextState;
          }),
        );
      };

      const useStoreSelector = <U>(selector: (state: S) => U): U => {
        return useStore(selector);
      };

      return {
        Component,
        getState,
        setState,
        useStore: useStoreSelector,
      };
    },
  };

  componentInstances.set(name, builder);
  return builder;
};

export { ReactBuilder };
