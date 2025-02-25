import { useRef } from "react";

import { useMemoizedFn } from "ahooks";

type MapKey = string | number;
type DomMap = Map<MapKey, HTMLElement>;

/**
 * useDoms
 * @return getDom //get a dom by id
 * @return setDom //set dom instance in the loop
 * @example
 * const Comp = ({ list }) => {
 *   const { getDom, setDom } = useDoms();
 *   const handleClick = (id) => {
 *      const $dom = getDom(id);
 *      // TOOD
 *   }
 *   return list.map((item, index) => {
 *     return (
 *       <div
 *         key={item.id}
 *         ref={setDom(item.id)}
 *         onClick={(e)=>handleClick(item.id)}
 *         children={item.name}
 *       />
 *     );
 *   });
 * };
 *
 */
export const useDoms = () => {
  const ref = useRef<DomMap | null>(null);

  const getDomMap = useMemoizedFn(() => {
    if (!ref.current) {
      ref.current = new Map();
    }
    return ref.current;
  });

  const setDom = (id: MapKey) => (node: HTMLElement | null) => {
    const map = getDomMap();
    node ? map.set(id, node) : map.delete(id);
  };

  const getDom = (id: MapKey) => getDomMap().get(id);

  return {
    setDom: useMemoizedFn(setDom),
    getDom: useMemoizedFn(getDom),
  };
};

export type UseDomsRes = ReturnType<typeof useDoms>;
