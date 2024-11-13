/* eslint-disable @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-misused-promises */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";

import { useMount, useUnmount } from "ahooks";
import { produce } from "immer";
import { create } from "zustand";

// 回调函数参数
type CBFnArg<S, P> = { state: S; props: P };
type HandlerFnArg<S, P> = CBFnArg<S, P>;

// 定义渲染函数参数的类型，包含状态、属性和子节点
type RenderFnArg<S, P, H extends Record<string, any>> = {
  children: React.ReactNode;
  handler: { [K in keyof H]: (event: React.SyntheticEvent) => void };
} & CBFnArg<S, P>;

// 生成器接口，定义了构建器的各种方法
interface IPageBuilder<S, P, H extends Record<string, any>> {
  name: string;
  state<K extends keyof S>(key: K, initialValue: S[K]): this;
  props<K extends keyof P>(key: K, defaultValue: P[K]): this;
  //   fetch(): this; //TODO
  handler<K extends string>(
    name: K,
    fn: (
      arg: HandlerFnArg<S, P> & { event: React.SyntheticEvent },
    ) => void | Promise<void>,
  ): IPageBuilder<S, P, H & Record<K, typeof fn>>;
  mount(fn: (arg: CBFnArg<S, P>) => void | Promise<void>): this;
  unmount(fn: (arg: CBFnArg<S, P>) => void | Promise<void>): this;
  ui(renderFn: (arg: RenderFnArg<S, P, H>) => React.ReactNode): this;
  build(): {
    Component: React.FC<P & { children?: React.ReactNode }>;
    getState: <K extends keyof S>(key: K) => S[K];
    setState: <K extends keyof S>(key: K, nextState: S[K]) => void;
    useStore: <U>(selector: (state: S) => U) => U;
  };
}

const pageInstances = new Map<string, IPageBuilder<any, any, any>>();

/**
 * Page Builder
 * @param name component name
 * @example
 * type AppState = { name: string; age: number; tel: number };
 *type AppProps = { color?: string };
 *
 *const App = ComponentBuilder<AppState, AppProps>("App")
 *  .state("name", "hahaha")
 *  .state("age", 1)
 * .props("color", "red")
 * .mount(() => {
 *   console.log("App is Mount");
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
 *const Child = ComponentBuilder("Child1")
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
const PageBuilder = <
  S extends Record<string, unknown>,
  P extends Record<string, unknown>,
  H extends Record<string, any> = {},
>(
  name: string,
): IPageBuilder<S, P, H> => {
  if (pageInstances.has(name)) {
    return pageInstances.get(name)!;
  }

  const useStore = create<S>(() => ({}) as S);
  const defaultProps: Partial<P> = {};
  const handlers: Partial<H> = {};

  const mountEffects: ((arg: CBFnArg<S, P>) => void | Promise<void>)[] = [];
  const unmountEffects: ((arg: CBFnArg<S, P>) => void | Promise<void>)[] = [];

  let renderFn: (arg: RenderFnArg<S, P, H>) => React.ReactNode = () => null;

  const builder: IPageBuilder<S, P, H> = {
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
    ): IPageBuilder<S, P, H & Record<K, typeof fn>> {
      handlers[name as keyof H] = (async (
        arg: HandlerFnArg<S, P> & { event: React.SyntheticEvent },
      ) => {
        const result = fn(arg);
        if (result instanceof Promise) {
          return await result;
        }
      }) as unknown as H[keyof H];
      return this as unknown as IPageBuilder<S, P, H & Record<K, typeof fn>>;
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
    // getInstance(name) {
    //   if (componentInstances.has(name)) {
    //     return componentInstances.get(name)!;
    //   }
    // },
    build: () => {
      const Component: React.FC<P & { children?: React.ReactNode }> =
        React.memo(({ children, ...props }) => {
          const state = useStore();

          const combinedProps = useMemo(
            () => ({ ...defaultProps, ...props }),
            [props],
          ) as P;

          // 提供给各回调函数的通用参数
          const cbArg = useMemo(
            () => ({ state, props: combinedProps }),
            [state, combinedProps],
          );

          useMount(() => {
            mountEffects.forEach((effect) => effect(cbArg));
          });

          useUnmount(() => {
            unmountEffects.forEach((effect) => effect(cbArg));
          });

          const handlerObj = useMemo(() => {
            return Object.keys(handlers).reduce(
              (acc, key) => {
                acc[key as keyof H] = (event: React.SyntheticEvent) =>
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                  handlers[key as keyof H]!({
                    ...cbArg,
                    event,
                  });
                return acc;
              },
              {} as { [K in keyof H]: (event: React.SyntheticEvent) => void },
            );
          }, [cbArg]);

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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            draft[key] = nextState;
          }),
        );
      };

      // const useStoreSelector = <U>(selector: (state: S) => U): U => {
      //   return useStore(selector);
      // };

      return {
        Component,
        getState,
        setState,
        useStore,
      };
    },
  };

  pageInstances.set(name, builder);
  return builder;
};

export { PageBuilder };
