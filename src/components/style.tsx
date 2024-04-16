class Style {
  themeName?: string = "";
}

class Sizing {
  width?: string = "";
  height?: string = "";
  minWidth?: string = "";
  minHeight?: string = "";
  maxWidth?: string = "";
  maxHeight?: string = "";
  size?: string = "";
}

class Backgrounds {
  bgAttachment?: string = "";
  bgClip?: string = "";
  bgColor?: string = "";
  bgOrigin?: string = "";
  bgPosition?: string = "";
  bgRepeat?: string = "";
  bgSize?: string = "";
  bgImage?: string = "";
  gradientColorStops?: string = "";
}

class Borders {
  borderRadius?: string = "";
  borderWidth?: string = "";
  borderColor?: string = "";
  borderStyle?: string = "";
  divideWidth?: string = "";
  divideColor?: string = "";
  divideStyle?: string = "";
  outlineWidth?: string = "";
  outlineColor?: string = "";
  outlineStyle?: string = "";
  outlineOffset?: string = "";
  ringWidth?: string = "";
  ringColor?: string = "";
  ringOffsetWidth?: string = "";
  ringOffsetColor?: string = "";
}

class Typography {
  fontFamily?: string = "";
  fontSize?: string = "";
  fontSmoothing?: string = "";
  fontStyle?: string = "";
  fontWeight?: string = "";
  fontVariantNumeric?: string = "";
  letterSpacing?: string = "";
  lineClamp?: string = "";
  lineHeight?: string = "";
  listStyleImage?: string = "";
  listStylePosition?: string = "";
  listStyleType?: string = "";
  textAlign?: string = "";
  textColor?: string = "";
  textDecoration?: string = "";
  textDecorationColor?: string = "";
  textDecorationStyle?: string = "";
  textDecorationThickness?: string = "";
  textUnderlineOffset?: string = "";
  textTransform?: string = "";
  textOverflow?: string = "";
  textWrap?: string = "";
  textIndent?: string = "";
  verticalAlign?: string = "";
  whiteSpace?: string = "";
  wordBreal?: string = "";
  hyphens?: string = "";
  content?: string = "";
}

class Spacing {
  padding?: string = "";
  margin?: string = "";
  spaceBetween?: string = "";
}

class FlexAndGrid {
  flexBasis?: string = "";
  flexDirection?: string = "";
  flexWrap?: string = "";
  flex?: string = "";
  flexGrow?: string = "";
  flexShrink?: string = "";
  order?: string = "";
  gridTemplateColumns?: string = "";
  gridColumnStartEnd?: string = "";
  gridTemplateRows?: string = "";
  gridRowStartEnd?: string = "";
  gridAutoFlow?: string = "";
  gridAutoColumns?: string = "";
  gridAutoRows?: string = "";
  gap?: string = "";
  justifyContent?: string = "";
  justifyItems?: string = "";
  justifySelf?: string = "";
  alignContent?: string = "";
  alignItems?: string = "";
  alignSelf?: string = "";
  placeContent?: string = "";
  placeItems?: string = "";
  placeSelf?: string = "";
}

class Layout {
  aspectRatio?: string = "";
  container?: string = "";
  columns?: string = "";
  breakAfter?: string = "";
  breakBefore?: string = "";
  breakInline?: string = "";
  boxDecorationBreak?: string = "";
  boxSizing?: string = "";
  display?: string = "";
  floats?: string = "";
  clear?: string = "";
  isolation?: string = "";
  objectFit?: string = "";
  objectPosition?: string = "";
  overFlow?: string = "";
  overscrollBehavior?: string = "";
  position?: string = "";
  topRightBottomLeft?: string = "";
  visibility?: string = "";
  zIndex?: string = "";
}

const keys = [
  new Sizing(),
  new Backgrounds(),
  new Borders(),
  new Typography(),
  new Spacing(),
  new FlexAndGrid(),
  new Layout(),
].flatMap((item) => Object.keys(item));

export const isThemeKey = (key: string): boolean => keys.includes(key);

// export interface IBorders extends Borders {}
// export interface ITypography extends Typography {}
// export interface ISpacing extends Spacing {}
// export interface IFlexAndGrid extends FlexAndGrid {}
// export interface IBackgrounds extends Backgrounds {}
// export interface ISizing extends Sizing {}
// export interface ILayout extends Layout {}
export interface ITailwindTheme
  extends Layout,
    FlexAndGrid,
    Spacing,
    Sizing,
    Typography,
    Backgrounds,
    Borders,
    Style {}


