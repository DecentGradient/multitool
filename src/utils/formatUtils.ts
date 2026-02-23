import format from 'xml-formatter';

export const formatJson = (input: string): string => {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
};

export const minifyJson = (input: string): string => {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
};

export const formatXml = (input: string): string => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(input, "application/xml");
  const parseError = dom.querySelector("parsererror");
  if (parseError) {
    throw new Error(parseError.textContent || "Invalid XML");
  }
  return format(input, {
    indentation: '  ',
    collapseContent: true,
    lineSeparator: '\n'
  });
};

export const minifyXml = (input: string): string => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(input, "application/xml");
  const parseError = dom.querySelector("parsererror");
  if (parseError) {
    throw new Error(parseError.textContent || "Invalid XML");
  }
  return input.replace(/\>[\r\n ]+\</g, "><").trim();
};