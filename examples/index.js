import { makeTheme } from '../src/makeTheme';

const theme = makeTheme({
  breakpoints: {
    md: 375,
    lg: 768,
  },
  xsOverride: 'extraSmall',
});
