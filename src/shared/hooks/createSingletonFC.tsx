import { createContext, useContext } from "react";

import { useHandlerRef } from "./withRefFC";

function createSingletonFC<Handler, Props>(
  RefFC: React.ForwardRefExoticComponent<
    React.RefAttributes<Handler> & React.PropsWithoutRef<Props | {}>
  >,
) {
  const context = createContext<React.RefObject<Handler>>({
    current: null,
  });

  function SingletonProvider({
    children,
    ...props
  }: React.PropsWithChildren<React.PropsWithoutRef<Props>>) {
    const ref = useHandlerRef<Handler>();
    return (
      <context.Provider value={ref}>
        {children}
        <RefFC ref={ref} {...props} />
      </context.Provider>
    );
  }

  /**
   * useContextでHandlerRefを取得する
   * @returns Handler
   */
  const useSingletonHandler = () => useContext(context);

  return [SingletonProvider, useSingletonHandler] as const;
}

export { createSingletonFC };
