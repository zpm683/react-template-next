import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useMount, useUnmount } from "ahooks";

import { getBaseURL } from "./env";

// Type definition for a fallback render function used in error boundaries
type FallbackRender = (props: FallbackProps) => React.ReactNode;

// Type definition for router configuration
type BaseRouterConfig = {
  element: React.ReactNode; // React component to render for the route
  isPrivate?: boolean; // Optional flag indicating if the route is private
};

type PathRouterConfig = BaseRouterConfig & {
  path: string; // Path for the route
  index?: false;
};

type IndexRouterConfig = BaseRouterConfig & {
  index: true; // Optional flag indicating if the route is an index route
  path?: never;
};

// Type definition for router configuration
type RouterConfig = PathRouterConfig | IndexRouterConfig;

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
  mount(fn: () => void): this;
  /** Set a function to execute when the component unmounts */
  unmount(fn: () => void): this;
  /** Build the final component and provide state management methods */
  build(): React.FC;
}

let appInstance: IAppBuilder | undefined = undefined;

type Options = Partial<{
  useHashRouter: boolean;
  notUseBaseName: boolean;
}>;

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
const AppBuilder = (options?: Options) => {
  if (appInstance) return appInstance;

  // Array to store page information
  const pages: RouterConfig[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const providers: { component: React.ComponentType<any>; props: any }[] = [];

  // Arrays to store mount and unmount effect functions
  const mountEffects: Array<() => void> = [];
  const unmountEffects: Array<() => void> = [];

  // Default 404 page and error boundary page
  let notFoundPage: React.ReactNode = <div>404 Not Found</div>;
  let fallbackRender: FallbackRender = ({ error, resetErrorBoundary }) => {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>
          {error instanceof Error ? error.message : String(error)}
        </pre>
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
      pages.push({ isPrivate: false, ...config });
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

        const RouterByType = options?.useHashRouter
          ? HashRouter
          : BrowserRouter;

        return (
          <ErrorBoundary fallbackRender={fallbackRender}>
            <RouterByType
              basename={options?.notUseBaseName ? undefined : getBaseURL()}
            >
              {renderProviders(
                <Routes>
                  {pages.map((page, index) => {
                    const element = page.isPrivate ? (
                      hasAuth() ? (
                        page.element
                      ) : (
                        <Navigate to={redirectPath} />
                      )
                    ) : (
                      page.element
                    );

                    if (page.index) {
                      return (
                        <Route
                          key={`index-route-${index}`}
                          index
                          element={element}
                        />
                      );
                    }

                    return (
                      <Route
                        key={page.path}
                        path={page.path}
                        element={element}
                      />
                    );
                  })}
                  <Route path="*" element={notFoundPage} />
                </Routes>,
              )}
            </RouterByType>
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
