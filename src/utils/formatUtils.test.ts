import { describe, it, expect } from 'vitest';
import { formatJson, minifyJson, formatXml, minifyXml } from './formatUtils';

describe('Format Utilities', () => {
  describe('JSON', () => {
    it('formats valid JSON', () => {
      const input = '{"a":1,"b":2}';
      const expected = '{\n  "a": 1,\n  "b": 2\n}';
      expect(formatJson(input)).toBe(expected);
    });

    it('minifies valid JSON', () => {
      const input = '{\n  "a": 1,\n  "b": 2\n}';
      const expected = '{"a":1,"b":2}';
      expect(minifyJson(input)).toBe(expected);
    });

    it('throws on invalid JSON', () => {
      const input = '{"a":1,';
      expect(() => formatJson(input)).toThrow();
    });
  });

  describe('XML', () => {
    it('minifies valid XML', () => {
      const input = '<root>\n  <child>text</child>\n</root>';
      const minified = minifyXml(input);
      expect(minified).toBe('<root><child>text</child></root>');
    });

    it('throws on invalid XML', () => {
      const input = '<root><child>text</root>';
      expect(() => formatXml(input)).toThrow();
    });
  });
});