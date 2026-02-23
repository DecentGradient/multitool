import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { Code2 } from 'lucide-react';
import format from 'xml-formatter';

const XmlFormatterComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      // Validate
      const parser = new DOMParser();
      const dom = parser.parseFromString(input, "application/xml");
      const parseError = dom.querySelector("parsererror");
      if (parseError) {
        throw new Error(parseError.textContent || "Invalid XML");
      }
      
      const formatted = format(input, {
        indentation: '  ',
        collapseContent: true,
        lineSeparator: '\n'
      });
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleMinify = () => {
    try {
      const parser = new DOMParser();
      const dom = parser.parseFromString(input, "application/xml");
      const parseError = dom.querySelector("parsererror");
      if (parseError) {
        throw new Error(parseError.textContent || "Invalid XML");
      }
      
      // Minify by removing line breaks and spaces between tags
      const minified = input.replace(/\>[\r\n ]+\</g, "><").trim();
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">XML Formatter & Validator</h2>
        <div className="space-x-2">
          <button onClick={handleFormat} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors">Format</button>
          <button onClick={handleMinify} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md font-medium transition-colors">Minify</button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-md">
          {error}
        </div>
      )}

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-[400px]">
        <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
          <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Input</div>
          <Editor
            height="100%"
            defaultLanguage="xml"
            theme="vs-dark"
            value={input}
            onChange={(val) => setInput(val || '')}
            options={{ minimap: { enabled: false }, formatOnPaste: true }}
          />
        </div>
        <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
          <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Output</div>
          <Editor
            height="100%"
            defaultLanguage="xml"
            theme="vs-dark"
            value={output}
            options={{ readOnly: true, minimap: { enabled: false } }}
          />
        </div>
      </div>
    </div>
  );
};

export const XmlFormatterModule: MultitoolModule = {
  id: 'xml-formatter',
  name: 'XML Formatter',
  category: 'Formatters',
  description: 'Format, minify, and validate XML data.',
  keywords: ['xml', 'format', 'minify', 'validate', 'pretty', 'print'],
  icon: Code2,
  render: XmlFormatterComponent,
};