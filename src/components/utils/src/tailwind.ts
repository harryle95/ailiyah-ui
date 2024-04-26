import { TailwindTheme, TailwindProps } from "./tailwind.types";
import { PresetTheme } from "./default.types";

const keys = Object.keys(new TailwindTheme());

/**
 * Check whether a prop is a tailwind prop
 *
 * @param propName name of prop
 * @returns true if propName is a valid tailwind prop - i.e. `twWidth`, false otherwise
 */
const isTailwindKey = (propName: string) => keys.includes(propName);

/**
 * Collect all tailwind props under twProps key. The remaining props has no tw keys
 * @param props prop object with all props
 * @returns an object with twProps key, whose value is an object with all tw props.
 */
const extractTailwindTheme = <T extends TailwindProps>(props: T) => {
  const twProps: TailwindProps = {};
  const rest = {};

  Object.keys(props).forEach((key) => {
    if (isTailwindKey(key)) {
      // @ts-ignore
      twProps[key] = props[key];
    } else {
      // @ts-ignore
      rest[key] = props[key];
    }
  });
  return { ...rest, twProps: twProps };
};

/**
 * Create a tailwind class based on all of tailwind props. If a themeName is
 * provided, themeName is appended to the start of the className string.
 *
 * @param props all tailwind props
 * @returns className string as a concatenation of all tw props
 */
const toClassString = (props: TailwindProps): string => {
  const { themeName = "", ...value } = props;
  const valueString = Object.values(value).join(" ");
  return themeName.trim()
    ? (themeName.trim() + " " + valueString).trim()
    : valueString;
};

/**
 * Get tailwind class name from props, which contains both TailwindProps and
 * Component Props. If className is provided, prepend the original className
 * value to the result obtainedfrom `toClassString`.
 *
 * @param props props provided to component
 * @param theme theme obtained from theme provider
 * @returns className in string
 */
const getClassName = <T extends TailwindProps>(
  props: T,
  theme: PresetTheme
) => {
  const { twProps, ...rest } = extractTailwindTheme(props);
  const appliedTheme =
    twProps.themeName && theme[twProps.themeName]
      ? { ...theme[twProps.themeName], ...twProps }
      : twProps;

  const stringTheme = toClassString(appliedTheme);
  // @ts-ignore
  const className = rest.className
    ? // @ts-ignore
      (rest.className.trim() + " " + stringTheme).trim()
    : stringTheme;
  return { ...rest, className: className };
};

export { isTailwindKey, extractTailwindTheme, toClassString, getClassName };
