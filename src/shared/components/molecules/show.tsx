import { ReactNode } from "react";

import { isEmpty } from "radash";

import { isFunction, isNullable } from "shared/utils";

type ShowProps<T> = {
  fallback?: ReactNode;
  hideWhenNullish?: boolean;
  /**
   * Determines whether empty objects or arrays should also trigger the fallback.
   * - If `true`, even non-null objects or arrays will trigger the fallback if they are empty.
   * - Default: `false`.
   */
  banEmptyTrigger?: boolean;
  /**
   * - If `boolean`:
   * true → children
   * false → fallback
   *
   * - If not `boolean`:
   * nonNullable → children
   * nullable → fallback
   */
  trigger: boolean | T;
  /**
   * Content to be rendered when `trigger` is valid.
   * - Can be a ReactNode or a function return a ReactNode.
   * - If a function is provided, it receives `trigger` as its argument.
   */
  children: ((data: NonNullable<T>) => ReactNode) | ReactNode;
};

/**
 * A conditional rendering component for more expressive control.
 * Renders `children` if the `trigger` is valid, otherwise renders `fallback`.
 */
const Show = <T,>({
  fallback,
  hideWhenNullish = false,
  banEmptyTrigger = false,
  trigger,
  children,
}: ShowProps<T>) => {
  // #region hooks start
  // #endregion hooks end

  // #region useEffect functions start
  // #endregion useEffect functions end

  // #region logic functions start
  // #endregion logic functions end

  // #region render functions start
  if (hideWhenNullish && isNullable(trigger)) {
    return null;
  }

  if (typeof trigger === "boolean") {
    return trigger ? (children as ReactNode) : fallback;
  }

  if (!isNullable(trigger)) {
    if (banEmptyTrigger && isEmpty(trigger)) {
      return fallback;
    }

    if (isFunction(children)) {
      return (children as (data: NonNullable<T>) => ReactNode)(
        trigger as NonNullable<T>,
      );
    }

    return children as ReactNode;
  }

  return fallback;
  // #endregion render functions end
};

export type { ShowProps };
export { Show };
