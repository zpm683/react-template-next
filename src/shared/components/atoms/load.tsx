import { FC, ReactNode, Suspense } from "react";

const Loading: FC = () => <div>Loading...</div>;

const lazyLoad = (children: ReactNode): ReactNode => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

export { lazyLoad };
