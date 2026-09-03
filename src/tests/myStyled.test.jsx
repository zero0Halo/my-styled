import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { makeTheme } from '../makeTheme';
import myStyled from '../myStyled';

describe('myStyled', () => {
  it('renders a div by default', () => {
    const Component = myStyled();
    const { container } = render(<Component />);

    expect(container.firstChild.tagName).toBe('DIV');
  });

  it('renders the specified element', () => {
    const Component = myStyled('button');
    const { container } = render(<Component />);

    expect(container.firstChild.tagName).toBe('BUTTON');
  });

  it('applies styled-system props', () => {
    const Component = myStyled('div');
    const { container } = render(<Component m={2} />);

    expect(container.firstChild).toHaveStyle('margin: 8px');
  });

  it('resolves styled-system props from the theme', () => {
    const Component = myStyled('div');
    const { container } = render(
      <Component
        theme={{
          space: [0, 4, 8, 16],
        }}
        m={3}
      />
    );

    expect(container.firstChild).toHaveStyle('margin: 16px');
  });

  it('applies attrs from options', () => {
    const Component = myStyled(
      'input',
      {},
      {
        attrs: {
          type: 'text',
          'aria-label': 'Name',
        },
      }
    );

    const { getByLabelText } = render(<Component />);
    const input = getByLabelText('Name');

    expect(input).toHaveAttribute('type', 'text');
  });

  it('applies styles from args', () => {
    const Component = myStyled('div', {
      color: 'red',
      padding: '12px',
    });

    const { container } = render(<Component />);

    expect(container.firstChild).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      padding: '12px',
    });
  });

  it('supports responsive styles in args', () => {
    const Component = myStyled('div', {
      fontSize: {
        sm: '16px',
        md: '20px',
      },
    });

    const theme = makeTheme({
      breakpoints: {
        sm: 576,
        md: 768,
      },
    });

    render(<Component theme={theme} />);

    const styles = document.head.textContent;

    expect(styles).toContain('@media');
    expect(styles).toContain('min-width:576px');
    expect(styles).toContain('font-size:16px');
    expect(styles).toContain('min-width:768px');
    expect(styles).toContain('font-size:20px');
  });

  it('supports args as a function of props', () => {
    const Component = myStyled('div', ({ active }) => ({
      opacity: active ? 1 : 0.5,
    }));

    const { container } = render(<Component active />);

    expect(container.firstChild).toHaveStyle({
      opacity: '1',
    });
  });
});
