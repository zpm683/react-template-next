import { useEffect, useState } from "react";

import { off, on, throttle } from "../utils";

const defaultEvents = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "wheel",
];
const oneMinute = 60e3;

const useIdle = (
  ms: number = oneMinute,
  initialState: boolean = false,
  events: string[] = defaultEvents,
): boolean => {
  const [state, setState] = useState<boolean>(initialState);

  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line no-undef
    let timeout: NodeJS.Timeout;
    let localState: boolean = state;
    const set = (newState: boolean) => {
      if (mounted) {
        localState = newState;
        setState(newState);
      }
    };

    const onEvent = throttle(() => {
      if (localState) {
        set(false);
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => set(true), ms);
    }, 50);
    const onVisibility = () => {
      if (!document.hidden) {
        onEvent();
      }
    };

    for (let i = 0; i < events.length; i++) {
      on(window, events[i], onEvent);
    }
    on(document, "visibilitychange", onVisibility);

    timeout = setTimeout(() => set(true), ms);

    return () => {
      mounted = false;

      for (let i = 0; i < events.length; i++) {
        off(window, events[i], onEvent);
      }
      off(document, "visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ms, events]);

  return state;
};

export { useIdle };
