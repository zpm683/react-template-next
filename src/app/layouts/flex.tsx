import { CSSProperties, FC } from "react";

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  sx?: CSSProperties;
};

export const Flex: FC<FlexProps> = ({ children, sx, style, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "hidden auto",
        ...style,
        ...sx,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
