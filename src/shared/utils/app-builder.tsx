import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useMount, useUnmount } from "ahooks";

// Type definition for a fallback render function used in error boundaries
type FallbackRender = (props: {
  error: { message: string }; // Error object with a message property
  resetErrorBoundary: (...args: unknown[]) => void; // Function to reset the error boundary
}) => React.ReactNode;

// Type definition for router configuration
type RouterConfig = {
  path: string; // Path for the route
  element: React.ReactNode; // React component to render for the route
  isPrivate?: boolean; // Optional flag indicating if the route is private
  index?: boolean; // Optional flag indicating if the route is an index route
};

// Interface definition for the app builder, containing various methods for building the app
interface IAppBuilder {
  /** Set authentication logic and redirect path */
  auth(hasAuth: () => boolean, redirectPath: string): this;
  /** Add a page with specified path, privacy flag, and component */
  page(config: RouterConfig): this;
  /** Set the 404 page */
  notFound(notFoundPage: React.ReactNode): this;
  /** Set the error boundary page */
  error(render: FallbackRender): this;
  /** Add a provider component */
  provider<P>(provider: React.ComponentType<P>, props?: P): this;
  /** Set a function to execute when the component mounts */
  mount(fn: () => void | Promise<void>): this;
  /** Set a function to execute when the component unmounts */
  unmount(fn: () => void | Promise<void>): this;
  /** Build the final component and provide state management methods */
  build(): React.FC;
}

let appInstance: IAppBuilder | undefined = undefined;

/**
 * A React App Builder
 * @example
 *const AppInstance = AppBuilder<AppContext>()
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
const AppBuilder = () => {
  if (appInstance) return appInstance;

  // Array to store page information
  const pages: RouterConfig[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: { component: React.ComponentType<any>; props: any }[] = [];

  // Arrays to store mount and unmount effect functions
  const mountEffects: (() => void | Promise<void>)[] = [];
  const unmountEffects: (() => void | Promise<void>)[] = [];

  // Default 404 page and error boundary page
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

  // Default authentication function and redirect path
  let hasAuth: () => boolean = () => true;
  let redirectPath: string = "/";

  // Builder object containing implementations of all methods
  const builder: IAppBuilder = {
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
      // Define the final component
      const Component: React.FC = () => {
        // Execute all mount effects when the component mounts
        useMount(() => {
          mountEffects.forEach((effect) => effect());
        });

        // Execute all unmount effects when the component unmounts
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
            <BrowserRouter basename={import.meta.env.ENV_APP_BASE_URL}>
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
      };

      return Component;
    },
  };

  appInstance = builder;
  return builder;
};

export { AppBuilder };
