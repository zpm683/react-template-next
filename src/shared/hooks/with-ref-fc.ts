import {
  ElementRef,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  MutableRefObject,
  ReactElement,
  RefAttributes,
  useRef,
} from "react";

/** ref passed to parent component */
type HandlerRef<T> =
  | ((instance: T | null) => void)
  | MutableRefObject<T | null>
  | null;

/** Methods exposed in child components passed to useRef */
type UseRefHandler<T> = ElementRef<ForwardRefExoticComponent<RefAttributes<T>>>;

/**
 * Makes the FunctionComponent accessible in ref.
 * @param funcComp
 * @example
 *   // methods you want to expose in ref
 *   export type Handler = {
 *     hello: () => void;
 *   };
 *
 *   // Publishing Components
 *   export const Child = withRefFC<Handler>((ref, props) => {
 *     const [text, setText] = useState('');
 *
 *     // defining methods to publish
 *     useImperativeHandle(ref, () => ({
 *       hello: () => {
 *         alert(`Hello ${text}!`);
 *       },
 *     }), [text]);
 *
 *     return (
 *       <input type="text" value={text} onChange={(e) => {
 *         setText(e.target.value);
 *       }} />
 *     );
 *   });
 *
 *  @see useHandlerRef
 */
const withRefFC = <Handler, Props = {}>(
  funcComp: (ref: HandlerRef<Handler>, props: Props) => ReactElement | null,
) => {
  const HoC: ForwardRefRenderFunction<Handler, Props> = (p, r) =>
    funcComp(r, p);
  return forwardRef(HoC);
};

/**
 * which component to use
 *  @example
 *   import {Handler, Child} from "withRefFunctionComponent"
 *   export const Parent: FC = () => {
 *     const handlerRef = useHandlerRef<Handler>();
 *     return (
 *       <div>
 *         <Child ref={handlerRef} />
 *         <button onClick={() => {
 *           handlerRef.current?.hello();
 *         }}>click!</button>
 *       </div>
 *     );
 *   };
 */
const useHandlerRef = <Handler>() => useRef<UseRefHandler<Handler>>(null);

export { withRefFC, useHandlerRef };
