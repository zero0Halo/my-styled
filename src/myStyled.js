// This is an experiment that so far is working.
// It creates styled components that automatically tap into the theme.
// It's not perfect, but it does 90% of what I need.

import styled from 'styled-components/macro';
import {
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  shadow,
  space,
  typography,
} from 'styled-system';
import styledSystemCss from './css';

const myStyled = (node = 'div', args = {}, options) => {
  return styled(node).attrs(options?.attrs)(
    ({ theme, ...props }) => {
      const css = styledSystemCss(args)(theme, props);

      return {
        ...css,
      };
    },
    compose(
      border,
      color,
      flexbox,
      layout,
      position,
      shadow,
      space,
      typography
    ),
    options?.variants
  );
};

export default myStyled;
