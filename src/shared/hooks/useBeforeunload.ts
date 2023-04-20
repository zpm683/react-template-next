import { useEffect, useRef } from "react";

type UseBeforeunloadHandler =
  | ((arg: Event) => string | undefined)
  | ((arg: Event) => void);

/**
 * useBeforeunload
 * @param handler
 * @example
 *    useBeforeunload(e => e.preventDefault());
 */
export const useBeforeunload = (handler?: UseBeforeunloadHandler) => {
  const eventListenerRef = useRef<any>();

  useEffect(() => {
    eventListenerRef.current = (event: BeforeUnloadEvent) => {
      const returnValue = handler?.(event);
      // Handle legacy `event.returnValue` property
      if (typeof returnValue === "string") {
        return (event.returnValue = returnValue);
      }
      // Chrome doesn't support `event.preventDefault()` on `BeforeUnloadEvent`,
      if (event.defaultPrevented) {
        return (event.returnValue = "");
      }
    };
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: BeforeUnloadEvent) => {
      eventListenerRef.current(event);
    };
    window.addEventListener("beforeunload", eventListener);
    return () => {
      window.removeEventListener("beforeunload", eventListener);
    };
  }, []);
};
