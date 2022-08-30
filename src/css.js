/*
  @styled-system/css
   I modified this to suit my needs
  https://github.com/styled-system/styled-system/blob/master/packages/css/src/index.js
*/
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
// based on https://github.com/developit/dlv
export const get = (obj, key, def, p, undef) => {
  key = key && key.split ? key.split('.') : [key];
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef ? def : obj;
};

const defaultBreakpoints = [40, 52, 64].map((n) => `${n}em`);

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
};

const aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY',
};

const multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  size: ['width', 'height'],
};

const scales = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  outlineColor: 'colors',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors',
};

const positiveOrNegative = (scale, value) => {
  if (typeof value !== 'number' || value >= 0) {
    return get(scale, value, value);
  }
  const absolute = Math.abs(value);
  const n = get(scale, absolute, absolute);
  if (typeof n === 'string') return `-${n}`;
  return n * -1;
};

const transforms = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'top',
  'bottom',
  'left',
  'right',
].reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: positiveOrNegative,
  }),
  {}
);

export const responsive = (styles) => (theme) => {
  const next = {};
  const breakpoints = get(theme, 'breakpoints', defaultBreakpoints);
  const mediaQueries = [
    null,
    ...breakpoints.map((n) => `@media screen and (min-width: ${n})`),
  ];

  for (const key in styles) {
    const value =
      typeof styles[key] === 'function' ? styles[key](theme) : styles[key];

    if (value == null) continue;

    // I added the check for an object literalin addition to the Array check because that's how
    // responsive would be passed in the styled component definition
    if (!Array.isArray(value) && typeof value !== 'object') {
      next[key] = value;
      continue;
    }

    // I added this. It is what enables responsive values to put in a styled component's definition
    if (!Array.isArray(value) && typeof value === 'object') {
      const breakpointKeys = Object.keys(value);
      const isABreakpoint = breakpointKeys
        .filter((f) => breakpoints[f])
        .map((m) => ({ value: breakpoints[m], size: m }));

      if (isABreakpoint.length) {
        isABreakpoint.forEach((fe) => {
          const query = `@media screen and (min-width: ${fe.value})`;
          next[query] = next[query] || {};
          next[query][key] = value[fe.size];
        });
      } else {
        next[key] = value;
        continue;
      }
    }

    // I had to add the check for an array down here since I opened up the logic above
    if (Array.isArray(value)) {
      for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
        const media = mediaQueries[i];
        if (!media) {
          next[key] = value[i];
          continue;
        }
        next[media] = next[media] || {};
        if (value[i] == null) continue;
        next[media][key] = value[i];
      }
    }
  }

  return next;
};

export const css =
  (args) =>
  (passedTheme = {}, props = {}) => {
    const theme = { ...defaultTheme, ...passedTheme };
    let result = {};
    const obj = typeof args === 'function' ? args(props) : args;
    const styles = responsive(obj)(theme);

    for (const key in styles) {
      const x = styles[key];
      const val = typeof x === 'function' ? x(theme) : x;

      if (key === 'variant') {
        const variant = css(get(theme, val))(theme);
        result = { ...result, ...variant };
        continue;
      }

      if (val && typeof val === 'object') {
        result[key] = css(val)(theme);
        continue;
      }

      const prop = get(aliases, key, key);
      const scaleName = get(scales, prop);
      const scale = get(theme, scaleName, get(theme, prop, {}));
      const transform = get(transforms, prop, get);
      const value = transform(scale, val, val);

      if (multiples[prop]) {
        const dirs = multiples[prop];

        for (let i = 0; i < dirs.length; i++) {
          result[dirs[i]] = value;
        }
      } else {
        result[prop] = value;
      }
    }

    return result;
  };

export default css;
