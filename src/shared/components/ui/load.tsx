import { FC, ReactNode, Suspense } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const Loading: FC = () => <div>Loading...</div>;

const lazyLoad = (children: ReactNode): ReactNode => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

export { lazyLoad };
