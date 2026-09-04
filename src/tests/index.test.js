import { describe, expect, it } from 'vitest';
import myStyled, { makeTheme } from '../index';

describe('public API', () => {
  it('exports myStyled and makeTheme', () => {
    expect(myStyled).toBeDefined();
    expect(makeTheme).toBeDefined();
  });
});
