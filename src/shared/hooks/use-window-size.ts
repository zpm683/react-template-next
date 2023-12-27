import { useEffect } from "react";

import { useRafState } from "ahooks";

import { isBrowser } from "../utils";

const _isBrowser = isBrowser();

export const useWindowSize = (
  initialWidth = Infinity,
  initialHeight = Infinity,
) => {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: _isBrowser ? window.innerWidth : initialWidth,
    height: _isBrowser ? window.innerHeight : initialHeight,
  });

  useEffect((): (() => void) | void => {
    if (_isBrowser) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handler);

      return () => {
        window.removeEventListener("resize", handler);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
