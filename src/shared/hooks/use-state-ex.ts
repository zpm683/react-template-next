/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

import { Draft, freeze, produce } from "immer";

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];

export function useStateEX<S = any>(initialValue: S | (() => S)): ImmerHook<S>;

/**
 *
 *
 * @param initialValue
 * @example
 * ```tsx
 * import React from "react";
 *import { useStateEX } from "shared/use-state-ex";
 *
 *
 *function App() {
 *  const [person, updatePerson] = useStateEX({
 *    name: "Michel",
 *    age: 33
 *  });
 *
 *  function updateName(name) {
 *    updatePerson(draft => {
 *      draft.name = name;
 *    });
 *  }
 *
 *  function becomeOlder() {
 *    updatePerson(draft => {
 *      draft.age++;
 *    });
 *  }
 *
 *  return (
 *    <div className="App">
 *      <h1>
 *        Hello {person.name} ({person.age})
 *      </h1>
 *      <input
 *        onChange={e => {
 *          updateName(e.target.value);
 *        }}
 *        value={person.name}
 *      />
 *      <br />
 *      <button onClick={becomeOlder}>Older</button>
 *    </div>
 *  );
 *}
 * ```
 */
export function useStateEX(initialValue: any) {
  const [val, updateValue] = useState(() =>
    freeze(
      typeof initialValue === "function" ? initialValue() : initialValue,
      true,
    ),
  );
  return [
    val,
    useCallback((updater: any) => {
      if (typeof updater === "function") updateValue(produce(updater));
      else updateValue(freeze(updater));
    }, []),
  ];
}
