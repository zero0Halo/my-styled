import { describe, expect, it } from 'vitest';
import { makeTheme } from '../makeTheme';

describe('makeTheme', () => {
  it('adds an xs breakpoint at 0', () => {
    const theme = makeTheme({
      breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
      },
    });

    expect(theme.breakpoints.xs).toBe('0px');
  });

  it('sorts breakpoints by value', () => {
    const theme = makeTheme({
      breakpoints: {
        lg: 992,
        sm: 576,
        md: 768,
      },
    });

    expect([...theme.breakpoints]).toEqual(['0px', '576px', '768px', '992px']);
  });

  it('adds named breakpoint properties', () => {
    const theme = makeTheme({
      breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
      },
    });

    expect(theme.breakpoints.sm).toBe('576px');
    expect(theme.breakpoints.md).toBe('768px');
    expect(theme.breakpoints.lg).toBe('992px');
  });

  it('supports overriding the xs breakpoint name', () => {
    const theme = makeTheme({
      breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
      },
      xsOverride: 'mobile',
    });

    expect(theme.breakpoints.mobile).toBe('0px');
    expect(theme.breakpoints.xs).toBeUndefined();
  });

  it('adds the zero breakpoint to the passed breakpoints object', () => {
    const breakpoints = {
      sm: 576,
      md: 768,
      lg: 992,
    };

    makeTheme({ breakpoints });

    expect(breakpoints.xs).toBe(0);
  });
});
