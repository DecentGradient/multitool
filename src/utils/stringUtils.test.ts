import { describe, it, expect } from 'vitest';
import { 
  toCamelCase, 
  toSnakeCase, 
  toKebabCase, 
  toTitleCase,
  sortLinesAZ,
  sortLinesZA,
  reverseLines,
  removeEmptyLines,
  trimLines,
  removeDuplicateLines
} from './stringUtils';

describe('String Utilities', () => {
  describe('Casing Conversions', () => {
    it('converts to camelCase', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
      expect(toCamelCase('Hello_World')).toBe('helloWorld');
    });

    it('converts to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
      expect(toSnakeCase('Hello World')).toBe('hello_world');
    });

    it('converts to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
      expect(toKebabCase('Hello World')).toBe('hello-world');
    });

    it('converts to Title Case', () => {
      expect(toTitleCase('hello world')).toBe('Hello World');
    });
  });

  describe('Line Manipulations', () => {
    it('sorts lines A-Z', () => {
      const input = 'zebra\napple\nbanana';
      const expected = 'apple\nbanana\nzebra';
      expect(sortLinesAZ(input)).toBe(expected);
    });

    it('sorts lines Z-A', () => {
      const input = 'apple\nzebra\nbanana';
      const expected = 'zebra\nbanana\napple';
      expect(sortLinesZA(input)).toBe(expected);
    });

    it('reverses lines', () => {
      const input = 'first\nsecond\nthird';
      const expected = 'third\nsecond\nfirst';
      expect(reverseLines(input)).toBe(expected);
    });

    it('removes empty lines', () => {
      const input = 'first\n\nsecond\n  \nthird';
      const expected = 'first\nsecond\nthird';
      expect(removeEmptyLines(input)).toBe(expected);
    });

    it('trims lines', () => {
      const input = '  first  \n second \nthird';
      const expected = 'first\nsecond\nthird';
      expect(trimLines(input)).toBe(expected);
    });

    it('removes duplicate lines', () => {
      const input = 'apple\napple\nbanana';
      const expected = 'apple\nbanana';
      expect(removeDuplicateLines(input)).toBe(expected);
    });
  });
});