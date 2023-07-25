import { ButtonHTMLAttributes } from "react";

import { withRefFC } from "shared/hooks";

type PrimaryButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Primary Button
 */
const PrimaryButton = withRefFC<HTMLButtonElement, PrimaryButtonProps>(
  (ref, props) => {
    return <button ref={ref} className="btn btn-primary" {...props} />;
  },
);

export { PrimaryButton };
