import { ImgHTMLAttributes } from "react";

import { withRefFC } from "shared/hooks";

type ImageProps = {} & ImgHTMLAttributes<HTMLImageElement>;

/**
 * Primary Button
 */
const Image = withRefFC<HTMLImageElement, ImageProps>((ref, props) => {
  return (
    <img
      ref={ref}
      className="ml-10 max-w-sm rounded-lg shadow-2xl"
      alt={props.src}
      {...props}
    />
  );
});

export { Image };
