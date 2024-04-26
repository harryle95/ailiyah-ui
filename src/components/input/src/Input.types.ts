import { TailwindProps, PrimitiveProps } from "@ailiyah-ui/utils";

interface InputProps extends PrimitiveProps.InputProps, TailwindProps {
  /**
   * Handler called when esc key is pressed. To prevent default behaviour,
   * set to (e)=>e.preventDefault().
   *
   * @param event - Keyboard event type for input element
   * @returns
   */
  onEscDown?: React.KeyboardEventHandler<HTMLInputElement>;

  /**
   * Handler called when enter key is pressed. To prevent default behaviour,
   * set to (e)=>e.preventDefault()
   *
   * @param event - Keyboard event type for input element
   * @returns
   */
  onEnterDown?: React.KeyboardEventHandler<HTMLInputElement>;
}
export type { InputProps };
