import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { Type } from 'lucide-react';

const StringUtilitiesComponent: React.FC = () => {
  const [input, setInput] = useState('');

  const handleTransform = (transform: (val: string) => string) => {
    setInput(transform(input));
  };

  const toCamelCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  };

  const toSnakeCase = (str: string) => {
    const match = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
    return match ? match.map(x => x.toLowerCase()).join('_') : str;
  };

  const toKebabCase = (str: string) => {
    const match = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
    return match ? match.map(x => x.toLowerCase()).join('-') : str;
  };

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const buttons = [
    { label: 'UPPERCASE', onClick: () => handleTransform(s => s.toUpperCase()) },
    { label: 'lowercase', onClick: () => handleTransform(s => s.toLowerCase()) },
    { label: 'Title Case', onClick: () => handleTransform(toTitleCase) },
    { label: 'camelCase', onClick: () => handleTransform(toCamelCase) },
    { label: 'snake_case', onClick: () => handleTransform(toSnakeCase) },
    { label: 'kebab-case', onClick: () => handleTransform(toKebabCase) },
    { label: 'Sort Lines (A-Z)', onClick: () => handleTransform(s => s.split('\n').sort().join('\n')) },
    { label: 'Sort Lines (Z-A)', onClick: () => handleTransform(s => s.split('\n').sort().reverse().join('\n')) },
    { label: 'Reverse Lines', onClick: () => handleTransform(s => s.split('\n').reverse().join('\n')) },
    { label: 'Remove Empty Lines', onClick: () => handleTransform(s => s.split('\n').filter(l => l.trim() !== '').join('\n')) },
    { label: 'Trim Lines', onClick: () => handleTransform(s => s.split('\n').map(l => l.trim()).join('\n')) },
    { label: 'Remove Duplicate Lines', onClick: () => handleTransform(s => Array.from(new Set(s.split('\n'))).join('\n')) },
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">String Utilities</h2>
        <button 
          onClick={() => setInput('')}
          className="text-sm text-slate-400 hover:text-slate-200"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded px-2 py-2 text-xs font-medium text-slate-300 transition-colors"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e] min-h-[400px]">
        <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700 flex justify-between">
          <span>Text Input / Output</span>
        </div>
        <Editor
          height="100%"
          defaultLanguage="plaintext"
          theme="vs-dark"
          value={input}
          onChange={(val) => setInput(val || '')}
          options={{ minimap: { enabled: false }, wordWrap: 'on' }}
        />
      </div>
    </div>
  );
};

export const StringUtilitiesModule: MultitoolModule = {
  id: 'string-utilities',
  name: 'String Utilities',
  category: 'Text',
  description: 'Convert casing, sort lines, and manipulate text strings.',
  keywords: ['string', 'text', 'case', 'sort', 'lines', 'uppercase', 'camelCase'],
  icon: Type,
  render: StringUtilitiesComponent,
};