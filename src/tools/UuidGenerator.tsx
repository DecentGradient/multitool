import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { Fingerprint } from 'lucide-react';

const UuidGeneratorComponent: React.FC = () => {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState<'v4'|'v1'>('v4');
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);

  const generateUuidV4 = () => {
    // Standard web crypto API for UUID v4
    return crypto.randomUUID();
  };

  const generateUuidV1 = () => {
    // Quick fallback implementation for UUID v1 (timestamp based)
    // Note: Since this is purely client-side without actual MAC address access,
    // we use random node bits as per RFC 4122 section 4.1.6
    let d = new Date().getTime();
    let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
    });
  };

  const handleGenerate = () => {
    let results: string[] = [];
    for (let i = 0; i < count; i++) {
      let uuid = version === 'v4' ? generateUuidV4() : generateUuidV1();
      
      if (!hyphens) {
        uuid = uuid.replace(/-/g, '');
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      
      results.push(uuid);
    }
    setOutput(results.join('\n'));
  };

  // Generate initially
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">UUID / GUID Generator</h2>
        <button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors">
          Generate New
        </button>
      </div>
      
      <div className="flex space-x-6 bg-slate-800 p-4 rounded-md border border-slate-700">
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Count</label>
          <input 
            type="number" 
            min="1" 
            max="1000" 
            value={count} 
            onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
            className="bg-[#1e1e1e] border border-slate-600 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 w-24"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Version</label>
          <select 
            value={version} 
            onChange={(e) => setVersion(e.target.value as 'v4'|'v1')}
            className="bg-[#1e1e1e] border border-slate-600 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500"
          >
            <option value="v4">Version 4 (Random)</option>
            <option value="v1">Version 1 (Time-based)</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2 justify-end pb-1">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={hyphens} 
              onChange={(e) => setHyphens(e.target.checked)}
              className="rounded bg-[#1e1e1e] border-slate-600 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Include Hyphens</span>
          </label>
        </div>
        <div className="flex flex-col space-y-2 justify-end pb-1">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={uppercase} 
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded bg-[#1e1e1e] border-slate-600 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Uppercase</span>
          </label>
        </div>
      </div>

      <div className="flex-1 flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
        <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700 flex justify-between">
          <span>Generated UUIDs</span>
          <span>{count} {count === 1 ? 'UUID' : 'UUIDs'}</span>
        </div>
        <Editor
          height="100%"
          defaultLanguage="plaintext"
          theme="vs-dark"
          value={output}
          options={{ readOnly: true, minimap: { enabled: false }, lineNumbers: 'on' }}
        />
      </div>
    </div>
  );
};

export const UuidGeneratorModule: MultitoolModule = {
  id: 'uuid-generator',
  name: 'UUID / GUID Generator',
  category: 'Crypto',
  description: 'Generate Version 1 and Version 4 UUIDs.',
  keywords: ['uuid', 'guid', 'generator', 'v4', 'v1', 'random'],
  icon: Fingerprint,
  render: UuidGeneratorComponent,
};