# styled-components-system

A small wrapper around `styled-components` and `styled-system` that makes theme values available directly when declaring styled components and adds support for named, object-based responsive breakpoints.

I originally built this because I liked the way `styled-system` handled theme-aware props, but wanted the same behavior when defining styles directly on a component. Along the way, I extended `@styled-system/css` to support responsive values using named breakpoints rather than requiring breakpoint arrays.

This package was published to npm and used in my own projects.

## Install

```bash
yarn add styled-components-system styled-components styled-system
```

## What It Adds

### Theme-aware component styles

`styled-components-system` lets values declared on the component resolve against the active theme in the same way that `styled-system` props do.

```jsx
const Button = myStyled('button', {
  color: 'primary',
  backgroundColor: 'secondary',
  padding: 2,
});
```

### Named responsive breakpoints

The CSS parser is adapted from `@styled-system/css` and extended to accept object-based responsive values keyed by breakpoint name.

Instead of relying only on positional arrays:

```jsx
{
  fontSize: [1, 2, 3];
}
```

styles can be written against named breakpoints:

```jsx
{
  fontSize: {
    xs: 1,
    md: 2,
    lg: 3,
  }
}
```

This made responsive component definitions easier to read and removed the need to remember which array position corresponded to which breakpoint.

### Theme creation

`makeTheme` converts a breakpoint object into the structure expected by the responsive style system while retaining the breakpoint names.

```jsx
const theme = makeTheme({
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
});
```

## Built With

- [styled-components](https://styled-components.com/)
- [styled-system](https://styled-system.com/)
- `@styled-system/css`

The CSS parsing logic in `src/css.jsx` is based on `@styled-system/css` and modified to support the named breakpoint behavior described above.

## Why I Built It

This wasn't intended to replace either `styled-components` or `styled-system`. It came out of using both libraries together and wanting a slightly different authoring experience.

Rather than duplicating that setup across projects, I pulled the behavior into a small reusable package and published it so I could consume it like any other dependency.
