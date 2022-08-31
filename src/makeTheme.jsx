export function makeTheme({ breakpoints: passedBreakpoints, xsOverride }) {
  // xs is ~always~ 0, so make sure it's set
  passedBreakpoints[xsOverride ?? 'xs'] = 0;

  // First convert the passed object into a 2-dimensional array and sort it by the breakpoint value
  let breakpoints = Object.entries(passedBreakpoints)
    .map(([key, value]) => [key, value])
    .sort((a, b) => a[1] - b[1]);

  // Then reduce the array down to only the values while simultaneously adding keys to the underlying object
  breakpoints = breakpoints.reduce((acc, [key, value]) => {
    acc[key] = `${value}px`;
    acc.push(`${value}px`);
    return acc;
  }, []);

  return {
    breakpoints,
  };
}
