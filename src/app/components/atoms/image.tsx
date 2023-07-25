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
      className="max-w-sm rounded-lg shadow-2xl ml-10"
      alt={props.src}
      {...props}
    />
  );
});

export { Image };
