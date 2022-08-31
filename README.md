# styled-components-system

This is a small wrapper around the `styled` module provided by `styled-components` that automatically
parses values from the theme when you declare the component, or when using the predefined
`styled-system` props. It also offers a simple object syntax for breakpoints in the component
declaration. I'm not going to make crazy claims about performance, but from my own usage in projects
it doesn't perform noticably slower than the system's its based off of. YMMV of course.

## Install

```
yarn add styled-components-system styled-components styled-system
```
