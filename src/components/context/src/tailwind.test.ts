import { describe, expect, test } from "vitest";
import {
  isTailwindKey,
  extractTailwindTheme,
  toClassString,
  getClassName,
} from "./tailwind";
import { TailwindProps } from "./tailwind.types";
import { defaultTheme } from "./default";
import { DivProps } from "../../primitives/types";

describe("Test isTailwindKey", () => {
  describe("Given a TailwindProps key", () => {
    test.each([["twWidth"], ["twHeight"], ["twBackgroundColor"]])(
      "isTailwindKey(%s) should be true",
      (key) => {
        expect(isTailwindKey(key)).toBe(true);
      }
    );
  });

  describe("Given a non TailwindProps key", () => {
    test.each([["twWith"], ["twheight"], ["twBorder"]])(
      "isTailwindKey(%s) should be false",
      (key) => {
        expect(isTailwindKey(key)).toBe(false);
      }
    );
  });
});

describe("Test extractTailwindTheme", () => {
  const testCallBack = (props, twTheme, restProp) => {
    const { twProps, ...rest } = extractTailwindTheme(
      props as unknown as TailwindProps
    );
    expect(twProps).toEqual(twTheme);
    expect(rest).toEqual(restProp);
  };
  describe("Given props with both TailwindProps and DivProps", () => {
    test.each([
      [
        { twWidth: "w-10", title: "Dummy" },
        { twWidth: "w-10" },
        { title: "Dummy" },
      ],
      [
        { twHeight: "h-10", "data-state": "active" },
        { twHeight: "h-10" },
        { "data-state": "active" },
      ],
    ])(
      "should separate TailwindProps and DivProps",
      (props, expTwProps, expDivProps) =>
        testCallBack(props, expTwProps, expDivProps)
    );
  });
  describe("Given props with only DivProps and no TailwindProps", () => {
    test.each([
      [{ title: "Dummy" }, {}, { title: "Dummy" }],
      [{ "data-state": "active" }, {}, { "data-state": "active" }],
    ])("TailwindProps should be empty", (props, expTwProps, expDivProps) =>
      testCallBack(props, expTwProps, expDivProps)
    );
  });
  describe("Given props with only TailwindProps and no DivProps", () => {
    test.each([
      [{ twWidth: "w-10" }, { twWidth: "w-10" }, {}],
      [{ twHeight: "h-10" }, { twHeight: "h-10" }, {}],
    ])("DivProps should be empty", (props, expTwProps, expDivProps) =>
      testCallBack(props, expTwProps, expDivProps)
    );
  });
  describe("Given empty props", () => {
    test.each([[{}, {}, {}]])(
      "DivProps and TailwindProps should be empty",
      (props, expTwProps, expDivProps) =>
        testCallBack(props, expTwProps, expDivProps)
    );
  });
});

describe("Test toClassstring", () => {
  let testCallBack = (props, className) => {
    const result = toClassString(props);
    expect(result).toBe(className);
  };

  describe.each([
    [{ twWidth: "w-10" }],
    [{ twHeight: "h-10" }],
    [{ twWidth: "w-10", twHeight: "h-10" }],
    [{ twBackgroundColor: "bg-white" }],
    [{}],
  ])("Given a prop: %o", (prop) => {
    let propString: string = Object.values(prop).join(" ");
    describe.each([["Icons"], ["Icons "], ["Box"], [""]])(
      "with themeName: '%s'",
      (themeName) => {
        let expClassName = (themeName.trim() + " " + propString).trim();
        test(`toClassString should return '${expClassName}'`, () => {
          return testCallBack({ ...prop, themeName: themeName }, expClassName);
        });
      }
    );
  });
});

describe("Test getClassName", () => {
  let testCallBack = (props, theme, className) => {
    const clsName = getClassName(props as unknown as TailwindProps, theme);
    expect(clsName.className).toEqual(className);
  };

  let propsNoTw = [[{}], [{ title: "Dummy" }], [{ dir: "ltr" }]];

  let propsTWOnly = [
    [{ twWidth: "w-10" }],
    [{ twHeight: "h-10" }],
    [{ twWidth: "w-10", twHeight: "h-10" }],
  ];

  let propsWithBoth = [];

  propsNoTw.forEach(([noTwItem]) => {
    propsTWOnly.forEach(([twOnlyItem]) => {
      // @ts-ignore
      propsWithBoth.push([{...noTwItem, ...twOnlyItem}]);
    });
  });
  
  let clashingThemes = [
    [{ Icons: { twWidth: "w-5", twHeight: "h-0" } }],
    [
      {
        Icons: {
          twWidth: "w-5",
          twHeight: "h-0",
          twBackgroundColor: "bg-white",
        },
      },
    ],
    [
      {
        Icons: {
          twWidth: "w-5",
          twHeight: "h-0",
          twBackgroundColor: "bg-white dark:bg-black",
        },
      },
    ],
  ];

  let nonClashingThemes = [
    [{}],
    [{ Icons: { twPosition: "absolute" } }],
    [{ Icons: { twFlex: "flex", twFlexGrow: "grow" } }],
  ];

  let clashingClassName = ["w-[1px]", "h-[100px]"];
  let nonClashingClassName = ["", "DummyClassName", "AnotherDummyClassName"];

  let themeTestFn = (props: TailwindProps & DivProps, themes: any) => {
    let { className, ...rest } = props;
    let { twProps, ...other } = extractTailwindTheme(rest);
    if (themes && twProps.themeName && themes[twProps.themeName])
      twProps = { ...themes[twProps.themeName], ...twProps };
    let expClassName = (
      className?.trim() +
      " " +
      toClassString(twProps)
    ).trim();

    test(`should return: ${expClassName}`, ()=>testCallBack(props, themes, expClassName));
  };

  let classNameTestFn = (props: TailwindProps & DivProps) => {
    // @ts-ignore
    describe.each(clashingThemes)(`with clashing theme %o`, (theme) =>
      themeTestFn(props, theme)
    );
    // @ts-ignore
    describe.each(nonClashingThemes)("with nonClashingThemes %o", (theme) =>
      themeTestFn(props, theme)
    ), props;
  };

  let themeNameTestFn = (props: TailwindProps & DivProps) => {
    describe.each(clashingClassName)("with clashingClassName: %s", (clsName) =>
      classNameTestFn({ ...props, className: clsName })
    );
    describe.each(nonClashingClassName)(
      "with nonClashingClassName: %s",
      (clsName) => classNameTestFn({ ...props, className: clsName })
    );
  };

  let propTestFn = (props: TailwindProps & DivProps) => {
    describe("with no themeName", () => themeNameTestFn(props));
    describe("with themeName: Icons", () =>
      themeNameTestFn({ ...props, themeName: "Icons" }));
    describe("with non-existing themeName", () =>
      themeNameTestFn({ ...props, themeName: "DummyName" }));
  };
  // @ts-ignore
  describe.each(propsNoTw)("with props that have no tailwind props %o", (props) =>
    propTestFn(props)
  );

  describe.each(propsTWOnly)(
    "with props that have only tailwind props %o",
    // @ts-ignore
    (props) => propTestFn(props)
  );

  describe.each(propsWithBoth)(
    "with both tailwind and non-tailwind props %o",
    // @ts-ignore
    (props) => propTestFn(props)
  );
});
