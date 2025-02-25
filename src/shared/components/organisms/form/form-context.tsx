import { createContext, useContext, useMemo } from "react";

type FormUiContext = {
  alignWidth?: number;
  hiddenAllErrorHelper?: boolean;
} & React.PropsWithChildren;

const formContext = createContext<FormUiContext>({
  alignWidth: undefined,
  hiddenAllErrorHelper: undefined,
});

const useFormUiContext = () => useContext(formContext);

const FormUiProvider: React.FC<FormUiContext> = ({
  alignWidth,
  hiddenAllErrorHelper,
  children,
}) => {
  const context = useMemo(
    () => ({
      alignWidth: alignWidth,
      hiddenAllErrorHelper: hiddenAllErrorHelper,
    }),
    [alignWidth, hiddenAllErrorHelper],
  );

  return (
    <formContext.Provider value={context}>{children}</formContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { FormUiProvider, useFormUiContext };
export type { FormUiContext };
