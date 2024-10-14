/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC, PropsWithChildren } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const Fallback = ({ error }: FallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error?.message}</pre>
    </div>
  );
};

const Error: FC<PropsWithChildren> = ({ children }) => {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
};

export { Error };
