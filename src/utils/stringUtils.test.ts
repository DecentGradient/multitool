import { describe, it, expect } from 'vitest';
import { 
  toCamelCase, 
  toSnakeCase, 
  toKebabCase, 
  toTitleCase,
  sortLinesAZ,
  removeDuplicateLines
} from './stringUtils';

describe('String Utilities', () => {
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

  it('sorts lines A-Z', () => {
    const input = 'zebra\napple\nbanana';
    const expected = 'apple\nbanana\nzebra';
    expect(sortLinesAZ(input)).toBe(expected);
  });

  it('removes duplicate lines', () => {
    const input = 'apple\napple\nbanana';
    const expected = 'apple\nbanana';
    expect(removeDuplicateLines(input)).toBe(expected);
  });
});