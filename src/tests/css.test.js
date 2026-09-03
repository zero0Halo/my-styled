import { describe, expect, it } from 'vitest';
import css, { get, responsive } from '../css';
import { makeTheme } from '../makeTheme';

describe('get', () => {
  it('gets a nested value by path', () => {
    const obj = {
      colors: {
        primary: 'red',
      },
    };

    expect(get(obj, 'colors.primary')).toBe('red');
  });

  it('returns the default value when the path does not exist', () => {
    const obj = {
      colors: {
        primary: 'red',
      },
    };

    expect(get(obj, 'colors.secondary', 'blue')).toBe('blue');
  });
});

describe('responsive', () => {
  it('maps named breakpoints to media queries', () => {
    const theme = makeTheme({
      breakpoints: {
        sm: 576,
        md: 768,
      },
    });

    const result = responsive({
      fontSize: {
        sm: '16px',
        md: '20px',
      },
    })(theme);

    expect(result).toEqual({
      '@media screen and (min-width: 576px)': {
        fontSize: '16px',
      },
      '@media screen and (min-width: 768px)': {
        fontSize: '20px',
      },
    });
  });

  it('maps responsive arrays to media queries', () => {
    const theme = makeTheme({
      breakpoints: {
        sm: 576,
        md: 768,
      },
    });

    const result = responsive({
      fontSize: ['12px', '14px', '16px', '20px'],
    })(theme);

    expect(result).toEqual({
      fontSize: '12px',
      '@media screen and (min-width: 0px)': {
        fontSize: '14px',
      },
      '@media screen and (min-width: 576px)': {
        fontSize: '16px',
      },
      '@media screen and (min-width: 768px)': {
        fontSize: '20px',
      },
    });
  });

  it('preserves non-breakpoint object values', () => {
    const theme = makeTheme({
      breakpoints: {
        sm: 576,
        md: 768,
      },
    });

    const result = responsive({
      '&:hover': {
        color: 'red',
      },
    })(theme);

    expect(result).toEqual({
      '&:hover': {
        color: 'red',
      },
    });
  });
});

describe('css', () => {
  it('resolves property aliases', () => {
    const result = css({
      m: '8px',
    })({}, {});

    expect(result).toEqual({
      margin: '8px',
    });
  });

  it('resolves values from theme scales', () => {
    const result = css({
      color: 'primary',
    })(
      {
        colors: {
          primary: '#ff0000',
        },
      },
      {}
    );

    expect(result).toEqual({
      color: '#ff0000',
    });
  });

  it('resolves numeric spacing values from the theme', () => {
    const result = css({
      margin: 2,
    })(
      {
        space: [0, 4, 8, 16],
      },
      {}
    );

    expect(result).toEqual({
      margin: 8,
    });
  });

  it('resolves negative spacing values from the theme', () => {
    const result = css({
      marginTop: -2,
    })(
      {
        space: [0, 4, 8, 16],
      },
      {}
    );

    expect(result).toEqual({
      marginTop: -8,
    });
  });
});
