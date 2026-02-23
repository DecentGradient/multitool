import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { FileJson } from 'lucide-react';

const JsonFormatterComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">JSON Formatter & Validator</h2>
        <div className="space-x-2">
          <button onClick={handleFormat} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition-colors">Format</button>
          <button onClick={handleMinify} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md font-medium transition-colors">Minify</button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-md">
          Invalid JSON: {error}
        </div>
      )}

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-[400px]">
        <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
          <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Input</div>
          <Editor
            height="100%"
            defaultLanguage="json"
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
            defaultLanguage="json"
            theme="vs-dark"
            value={output}
            options={{ readOnly: true, minimap: { enabled: false } }}
          />
        </div>
      </div>
    </div>
  );
};

export const JsonFormatterModule: MultitoolModule = {
  id: 'json-formatter',
  name: 'JSON Formatter',
  category: 'Formatters',
  description: 'Format, minify, and validate JSON data.',
  keywords: ['json', 'format', 'minify', 'validate', 'pretty', 'print'],
  icon: FileJson,
  render: JsonFormatterComponent,
};