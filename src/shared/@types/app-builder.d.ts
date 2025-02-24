/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * app-builder types
 */
declare module "builder.app" {
  // Type definition for a fallback render function used in error boundaries
  type FallbackRender = (props: {
    error: { message: string }; // Error object with a message property
    resetErrorBoundary: (...args: any[]) => void; // Function to reset the error boundary
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

  export { IAppBuilder, FallbackRender, RouterConfig };
}
