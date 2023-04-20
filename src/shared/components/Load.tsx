import { ReactNode, Suspense } from "react";

const Loading = () => <div>Loading...</div>;

const lazyLoad = (children: ReactNode): ReactNode => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

export { lazyLoad };
