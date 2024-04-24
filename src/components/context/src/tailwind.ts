import { TailwindTheme, TailwindProps } from "./tailwind.types";

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
  const twProps = {};
  const rest = {};

  Object.keys(props).forEach((key) => {
    if (isTailwindKey(key)) {
      twProps[key] = props[key];
    } else {
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
  const valueString = Object.values(props).join(" ");
  return themeName.trim() ? themeName.trim() + " " + valueString : valueString;
}

// static getClassName(
//   props: TailwindProps,
//   theme: PresetTheme
// ): { className: string; rest: Record<string, any> } {
//   const { tailwindTheme, rest } = Theme.extract(props);
//   const appliedTheme =
//     tailwindTheme.themeName && theme[tailwindTheme.themeName]
//       ? { ...theme[tailwindTheme.themeName], ...tailwindTheme }
//       : tailwindTheme;

//   const stringTheme = Theme.toString(appliedTheme);
//   const className = rest.className
//     ? rest.className + " " + stringTheme
//     : stringTheme;
//   return { className: className, rest: rest };
// }

export { isTailwindKey, extractTailwindTheme, toClassString };
