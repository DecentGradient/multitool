export const toCamelCase = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
};

export const toSnakeCase = (str: string) => {
  const match = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
  return match ? match.map(x => x.toLowerCase()).join('_') : str;
};

export const toKebabCase = (str: string) => {
  const match = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
  return match ? match.map(x => x.toLowerCase()).join('-') : str;
};

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

export const sortLinesAZ = (str: string) => str.split('\n').sort().join('\n');
export const sortLinesZA = (str: string) => str.split('\n').sort().reverse().join('\n');
export const reverseLines = (str: string) => str.split('\n').reverse().join('\n');
export const removeEmptyLines = (str: string) => str.split('\n').filter(l => l.trim() !== '').join('\n');
export const trimLines = (str: string) => str.split('\n').map(l => l.trim()).join('\n');
export const removeDuplicateLines = (str: string) => Array.from(new Set(str.split('\n'))).join('\n');