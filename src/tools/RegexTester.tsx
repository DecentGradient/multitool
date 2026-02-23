import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { Regex } from 'lucide-react';

const RegexTesterComponent: React.FC = () => {
  const [pattern, setPattern] = useState('[a-z]+');
  const [flags, setFlags] = useState('gi');
  const [testString, setTestString] = useState('Hello World 123!\nTesting regex matching.');
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const results = [];
      let match;
      
      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          results.push(match);
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) results.push(match);
      }
      
      setMatches(results);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Regex Tester</h2>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1 flex flex-col space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase">Regular Expression</label>
            <div className="flex items-center bg-[#1e1e1e] border border-slate-700 rounded-md px-3 py-2">
              <span className="text-slate-500 mr-1">/</span>
              <input 
                type="text" 
                value={pattern} 
                onChange={(e) => setPattern(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none text-slate-200 font-mono"
                placeholder="pattern"
              />
              <span className="text-slate-500 ml-1">/</span>
            </div>
          </div>
          <div className="w-32 flex flex-col space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase">Flags</label>
            <input 
              type="text" 
              value={flags} 
              onChange={(e) => setFlags(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-slate-200 font-mono"
              placeholder="g, i, m..."
            />
          </div>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-md">
            {error}
          </div>
        )}
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-[400px]">
        <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
          <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Test String</div>
          <Editor
            height="100%"
            defaultLanguage="plaintext"
            theme="vs-dark"
            value={testString}
            onChange={(val) => setTestString(val || '')}
            options={{ minimap: { enabled: false }, wordWrap: 'on' }}
          />
        </div>
        <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
          <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700 flex justify-between">
            <span>Match Results</span>
            <span>{matches.length} matches</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-4">
            {matches.length === 0 ? (
              <span className="text-slate-500">No matches found.</span>
            ) : (
              matches.map((match, i) => (
                <div key={i} className="bg-slate-800 rounded p-3 border border-slate-700">
                  <div className="flex justify-between text-slate-400 text-xs mb-1">
                    <span>Match {i + 1}</span>
                    <span>Index: {match.index}</span>
                  </div>
                  <div className="text-blue-300 break-all">{match[0]}</div>
                  {match.length > 1 && (
                    <div className="mt-2 pt-2 border-t border-slate-700">
                      <div className="text-slate-500 text-xs mb-1">Groups</div>
                      {match.slice(1).map((group: string, j: number) => (
                        <div key={j} className="flex space-x-2 text-xs mt-1">
                          <span className="text-slate-500">[{j + 1}]</span>
                          <span className="text-green-300 break-all">{group !== undefined ? group : <span className="text-slate-600 italic">undefined</span>}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const RegexTesterModule: MultitoolModule = {
  id: 'regex-tester',
  name: 'Regex Tester',
  category: 'Text',
  description: 'Test regular expressions against a string.',
  keywords: ['regex', 'regular expression', 'match', 'test', 'pattern'],
  icon: Regex,
  render: RegexTesterComponent,
};