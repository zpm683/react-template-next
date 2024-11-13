/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useMount, useUnmount } from "ahooks";
import { produce } from "immer";
import { create } from "zustand";

type FallbackRender = (props: {
  error: { message: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resetErrorBoundary: (...args: any[]) => void;
}) => React.ReactNode;

export type RouterConfig = {
  path: string;
  element: React.ReactNode;
  isPrivate?: boolean;
  index?: boolean;
};

// 定义生成器接口，包含构建器的各种方法
interface IAppBuilder<S> {
  /** 全局状态 */
  context<K extends keyof S>(key: K, initialValue: S[K]): this;
  /** 设置认证逻辑和重定向路径 */
  auth(hasAuth: () => boolean, redirectPath: string): this;
  /** 添加页面，指定路径、是否为私有页面以及页面组件 */
  page(config: RouterConfig): this;
  /** 设置404页面 */
  notFound(notFoundPage: React.ReactNode): this;
  /** 设置错误边界页面 */
  error(render: FallbackRender): this;
  /** 包装器 */
  provider<P>(provider: React.ComponentType<P>, props?: P): this;
  /** 设置组件挂载时执行的函数 */
  mount(fn: () => void | Promise<void>): this;
  /** 设置组件卸载时执行的函数 */
  unmount(fn: () => void | Promise<void>): this;
  /** 构建最终的组件并提供状态管理方法 */
  build(): {
    Component: React.FC<{ children?: React.ReactNode }>;
    getContext: <K extends keyof S>(key: K) => S[K];
    setContext: <K extends keyof S>(key: K, nextState: S[K]) => void;
    useStore: <U>(selector: (state: S) => U) => U;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let appInstance: IAppBuilder<any> | undefined = undefined;

/**
 * A React App Builder
 * @example
 * type AppContext = {
 *  isOk: boolean;
 * };
 *const AppInstance = AppBuilder<AppContext>()
 *  .context("isOk", false)
 *  .page({
 *    path: APP_PATH.ROOT,
 *    element: <Home />,
 *  })
 *  .page({ path: APP_PATH.HOME, element: <Home /> })
 *  .error(({ error }) => (
 *    <div role="alert">
 *      <p>Something went wrong:</p>
 *      <pre style={{ color: "red" }}>{error?.message}</pre>
 *    </div>
 *  ))
 *  .notFound(<div>404</div>)
 *  .auth(() => false, APP_PATH.ROOT)
 *  .build();
 *
 */
const AppBuilder = <S extends Record<string, unknown>>(): IAppBuilder<S> => {
  if (appInstance) return appInstance as IAppBuilder<S>;

  // 使用zustand创建一个状态存储
  const useStore = create<S>(() => ({}) as S);

  // 存储页面信息的数组
  const pages: RouterConfig[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: { component: React.ComponentType<any>; props: any }[] = [];

  // 存储挂载和卸载时的副作用函数
  const mountEffects: (() => void | Promise<void>)[] = [];
  const unmountEffects: (() => void | Promise<void>)[] = [];

  // 默认的404页面和错误边界页面
  let notFoundPage: React.ReactNode = <div>404 Not Found</div>;
  let fallbackRender: FallbackRender = ({ error, resetErrorBoundary }) => {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  };

  // 默认的认证函数和重定向路径
  let hasAuth: () => boolean = () => true;
  let redirectPath: string = "/";

  // 构建器对象，包含所有方法的实现
  const builder: IAppBuilder<S> = {
    context(key, initialValue) {
      if (key in useStore.getState()) {
        console.warn(`State key "${String(key)}" is already defined.`);
      }
      useStore.setState((state) => ({ ...state, [key]: initialValue }));
      return this;
    },
    auth(fn, path) {
      hasAuth = fn;
      redirectPath = path;
      return this;
    },
    page(config) {
      pages.push({ isPrivate: false, index: false, ...config });
      return this;
    },
    provider<P>(provider: React.ComponentType<P>, props?: P) {
      providers.push({ component: provider, props });
      return this;
    },
    notFound(page) {
      notFoundPage = page;
      return this;
    },
    error(render) {
      fallbackRender = render;
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
    build: () => {
      // 定义最终的组件
      const Component: React.FC = React.memo(() => {
        // 在组件挂载时执行所有挂载副作用
        useMount(() => {
          mountEffects.forEach((effect) => effect());
        });

        // 在组件卸载时执行所有卸载副作用
        useUnmount(() => {
          unmountEffects.forEach((effect) => effect());
        });

        const renderProviders = (children: React.ReactNode) => {
          return providers.reduceRight(
            (acc, { component: Provider, props }) => {
              return <Provider {...props}>{acc}</Provider>;
            },
            children,
          );
        };

        return (
          <ErrorBoundary fallbackRender={fallbackRender}>
            <BrowserRouter>
              {renderProviders(
                <Routes>
                  {pages.map(({ path, isPrivate, element, index }) => (
                    <Route
                      key={path}
                      path={path}
                      index={index}
                      element={
                        isPrivate ? (
                          hasAuth() ? (
                            element
                          ) : (
                            <Navigate to={redirectPath} />
                          )
                        ) : (
                          element
                        )
                      }
                    />
                  ))}
                  <Route path="*" element={notFoundPage} />
                </Routes>,
              )}
            </BrowserRouter>
          </ErrorBoundary>
        );
      });

      // 获取状态的方法
      const getState = <K extends keyof S>(key: K): S[K] => {
        return useStore.getState()[key];
      };

      // 设置状态的方法
      const setState = <K extends keyof S>(key: K, nextState: S[K]) => {
        useStore.setState((state) =>
          produce(state, (draft) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            draft[key] = nextState;
          }),
        );
      };

      return {
        Component,
        getContext: getState,
        setContext: setState,
        useStore: useStore,
      };
    },
  };

  appInstance = builder;
  return builder;
};

export { AppBuilder };
