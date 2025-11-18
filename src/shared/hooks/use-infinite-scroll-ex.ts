import { useMemo, useRef, useState } from "react";
import type { DependencyList } from "react";

import { useEventListener, useRequest, useUpdateEffect } from "ahooks";
import { BasicTarget, getTargetElement } from "ahooks/es/utils/domTarget";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
} from "ahooks/es/utils/rect";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Data = { list: any[]; [key: string]: any };

export type Service<TData extends Data> = (
  currentData?: TData,
) => Promise<TData>;

export interface InfiniteScrollResult<TData extends Data> {
  data: TData;
  loading: boolean;
  loadingMore: boolean;
  error?: Error;
  noMore: boolean;

  loadMore: () => void;
  loadMoreAsync: () => Promise<TData>;
  reload: () => void;
  reloadAsync: () => Promise<TData>;
  cancel: () => void;
  mutate: (data?: TData) => void;
}

export interface InfiniteScrollOptions<TData extends Data> {
  target?: BasicTarget<Element | Document>;
  isNoMore?: (data?: TData) => boolean;
  threshold?: number;
  direction?: "bottom" | "top";

  manual?: boolean;
  reloadDeps?: DependencyList;

  onBefore?: () => void;
  onSuccess?: (data: TData) => void;
  onError?: (e: Error) => void;
  onFinally?: (data?: TData, e?: Error) => void;
}

const useInfiniteScrollEx = <TData extends Data>(
  service: Service<TData>,
  options: InfiniteScrollOptions<TData> = {},
) => {
  const {
    target,
    isNoMore,
    threshold = 100,
    direction = "bottom",
    reloadDeps = [],
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally,
  } = options;

  const [finalData, setFinalData] = useState<TData>();
  const [loadingMore, setLoadingMore] = useState(false);
  const isScrollToTop = direction === "top";
  // lastScrollTop is used to determine whether the scroll direction is up or down
  const lastScrollTop = useRef<number | undefined>(undefined);
  // scrollBottom is used to record the distance from the bottom of the scroll bar
  const scrollBottom = useRef<number>(0);

  const noMore = useMemo(() => {
    if (!isNoMore) return false;
    return isNoMore(finalData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalData]);

  const { loading, error, run, runAsync, cancel } = useRequest(
    async (lastData?: TData) => {
      const currentData = await service(lastData);
      if (!lastData) {
        setFinalData({
          ...currentData,
          list: [...(currentData.list ?? [])],
        });
      } else {
        setFinalData({
          ...currentData,
          list: isScrollToTop
            ? [...currentData.list, ...(lastData.list ?? [])]
            : [...(lastData.list ?? []), ...currentData.list],
        });
      }
      return currentData;
    },
    {
      manual,
      onFinally: (_, d, e) => {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
      onBefore: () => onBefore?.(),
      onSuccess: (d) => {
        setTimeout(() => {
          if (isScrollToTop) {
            let el = getTargetElement(target);
            el = el === document ? document.documentElement : el;
            if (el) {
              const scrollHeight = getScrollHeight(el);
              (el as Element).scrollTo(0, scrollHeight - scrollBottom.current);
            }
          } else {
            scrollMethod();
          }
        });

        onSuccess?.(d);
      },
      onError: (e) => onError?.(e),
    },
  );

  const loadMore = () => {
    if (noMore) return;
    setLoadingMore(true);
    run(finalData);
  };

  const loadMoreAsync = () => {
    if (noMore) return Promise.reject();
    setLoadingMore(true);
    return runAsync(finalData);
  };

  const reload = () => {
    setLoadingMore(false);
    return run();
  };

  const reloadAsync = () => {
    setLoadingMore(false);
    return runAsync();
  };

  const scrollMethod = () => {
    const el = getTargetElement(target);
    if (!el) return;

    const targetEl = el === document ? document.documentElement : el;
    const scrollTop = getScrollTop(targetEl);
    const scrollHeight = getScrollHeight(targetEl);
    const clientHeight = getClientHeight(targetEl);

    if (isScrollToTop) {
      if (
        lastScrollTop.current !== undefined &&
        lastScrollTop.current > scrollTop &&
        scrollTop <= threshold
      ) {
        loadMore();
      }
      lastScrollTop.current = scrollTop;
      scrollBottom.current = scrollHeight - scrollTop;
    } else if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMore();
    }
  };

  useEventListener(
    "scroll",
    () => {
      if (loading || loadingMore) {
        return;
      }
      scrollMethod();
    },
    { target },
  );

  useEventListener(
    "wheel",
    (event) => {
      if (loading || loadingMore) {
        return;
      }

      const el = getTargetElement(target);
      if (!el) return;

      const targetEl = el === document ? document.documentElement : el;
      const scrollHeight = getScrollHeight(targetEl);
      const clientHeight = getClientHeight(targetEl);

      if (scrollHeight <= clientHeight) {
        if (event.deltaY < 0) {
          loadMore();
        }
      }
    },
    { target },
  );

  useUpdateEffect(() => {
    run();
  }, [...reloadDeps]);

  return {
    data: finalData,
    loading: !loadingMore && loading,
    error,
    loadingMore,
    noMore,

    loadMore,
    loadMoreAsync,
    reload: reload,
    reloadAsync: reloadAsync,
    mutate: setFinalData,
    cancel,
  };
};

export { useInfiniteScrollEx };
