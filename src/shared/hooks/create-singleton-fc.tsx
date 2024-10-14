import { createContext, useContext, useRef } from "react";

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
    const ref = useRef<Handler>(null);
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
