import {
  ComponentRef,
  forwardRef,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactElement,
  RefAttributes,
  RefObject,
  useRef,
} from "react";

/** Ref passed to the parent component */
type HandlerRef<T> =
  | ((instance: T | null) => void)
  | RefObject<T | null>
  | null;

/** Ref passed to useRef for methods exposed by the child component */
type UseRefHandler<T> = ComponentRef<
  ForwardRefExoticComponent<RefAttributes<T>>
>;

/**
 * Makes a FunctionComponent accessible via ref.
 * @param funcComp The function component to which you want to add a ref
 * @example
 *   // Methods to be exposed via ref
 *   export type Handler = {
 *     hello: () => void;
 *   };
 *   // Component exposing the methods
 *   export const Child = withRefFC<Handler>((ref, props) => {
 *     const [text, setText] = useState('');
 *
 *     // Define the methods to be exposed
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
 *  @see useHandlerRef Hook to use the ref
 */
export const withRefFC = <Handler, Props = object>(
  funcComp: (ref: HandlerRef<Handler>, props: Props) => ReactElement | null,
) => {
  const HoC: ForwardRefRenderFunction<Handler, Props> = (p, r) =>
    funcComp(r, p);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return forwardRef(HoC);
};

/**
 * Hook to use the ref in the parent component
 *  @example
 *   import {Handler, Child} from "withRefFunctionComponent"
 *   export const Parent: FC = () => {
 *     const handlerRef = useHandlerRef<Handler>();
 *     return (
 *       <div>
 *         <Child ref={handlerRef} />
 *         <button onClick={() => {
 *           handlerRef.current?.hello();
 *         }}>Click!</button>
 *       </div>
 *     );
 *   };
 */
export const useHandlerRef = <Handler>() =>
  useRef<UseRefHandler<Handler>>(null);
