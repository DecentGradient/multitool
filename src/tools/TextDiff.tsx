import React, { useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { GitCompare } from 'lucide-react';

const TextDiffComponent: React.FC = () => {
  const [original, setOriginal] = useState('First line\nSecond line\nThird line');
  const [modified, setModified] = useState('First line\nSecond line (modified)\nThird line\nFourth line (added)');
  const [mode, setMode] = useState<'edit' | 'diff'>('edit');

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Text Comparer (Diff)</h2>
        <div className="flex bg-slate-800 rounded-md p-1">
          <button
            onClick={() => setMode('edit')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'edit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Input Mode
          </button>
          <button
            onClick={() => setMode('diff')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === 'diff' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Diff Mode
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-[400px]">
        {mode === 'edit' ? (
          <>
            <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
              <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Original</div>
              <textarea
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                className="w-full h-full p-4 bg-transparent text-slate-200 font-mono text-sm resize-none focus:outline-none"
                placeholder="Paste original text here..."
              />
            </div>
            <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
              <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Modified</div>
              <textarea
                value={modified}
                onChange={(e) => setModified(e.target.value)}
                className="w-full h-full p-4 bg-transparent text-slate-200 font-mono text-sm resize-none focus:outline-none"
                placeholder="Paste modified text here..."
              />
            </div>
          </>
        ) : (
          <div className="col-span-2 flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
            <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Comparison</div>
            <DiffEditor
              height="100%"
              theme="vs-dark"
              original={original}
              modified={modified}
              options={{ minimap: { enabled: false }, renderSideBySide: true, readOnly: true, wordWrap: 'on' }}
              language="plaintext"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const TextDiffModule: MultitoolModule = {
  id: 'text-diff',
  name: 'Text Comparer',
  category: 'Text',
  description: 'Compare two strings of text and visualize differences.',
  keywords: ['diff', 'compare', 'text', 'differences', 'changes'],
  icon: GitCompare,
  render: TextDiffComponent,
};