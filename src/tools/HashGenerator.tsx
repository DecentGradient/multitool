import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { Hash } from 'lucide-react';
import CryptoJS from 'crypto-js';

const HashGeneratorComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  });

  useEffect(() => {
    let active = true;

    const computeHashes = async () => {
      if (!input) {
        setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
        return;
      }

      // Sync legacy hashes via crypto-js
      const md5 = CryptoJS.MD5(input).toString();
      const sha1 = CryptoJS.SHA1(input).toString();

      // Async secure hashes via Web Crypto API
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      
      const buffer256 = await crypto.subtle.digest('SHA-256', data);
      const sha256 = Array.from(new Uint8Array(buffer256)).map(b => b.toString(16).padStart(2, '0')).join('');
      
      const buffer512 = await crypto.subtle.digest('SHA-512', data);
      const sha512 = Array.from(new Uint8Array(buffer512)).map(b => b.toString(16).padStart(2, '0')).join('');

      if (active) {
        setHashes({ md5, sha1, sha256, sha512 });
      }
    };

    computeHashes();

    return () => {
      active = false;
    };
  }, [input]);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Hash Generator</h2>
      </div>

      <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e] h-48 flex-shrink-0">
        <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Input Text</div>
        <Editor
          height="100%"
          defaultLanguage="plaintext"
          theme="vs-dark"
          value={input}
          onChange={(val) => setInput(val || '')}
          options={{ minimap: { enabled: false }, wordWrap: 'on' }}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {[
          { label: 'MD5', value: hashes.md5 },
          { label: 'SHA1', value: hashes.sha1 },
          { label: 'SHA-256', value: hashes.sha256 },
          { label: 'SHA-512', value: hashes.sha512 },
        ].map((hash) => (
          <div key={hash.label} className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
            <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700 flex justify-between items-center">
              <span>{hash.label}</span>
              <button 
                className="hover:text-slate-200 transition-colors"
                onClick={() => navigator.clipboard.writeText(hash.value)}
              >
                Copy
              </button>
            </div>
            <div className="p-3 text-slate-300 font-mono break-all whitespace-pre-wrap select-all">
              {hash.value || <span className="opacity-30">Hash will appear here...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HashGeneratorModule: MultitoolModule = {
  id: 'hash-generator',
  name: 'Hash Generator',
  category: 'Crypto',
  description: 'Generate MD5, SHA1, SHA256, and SHA512 hashes.',
  keywords: ['hash', 'md5', 'sha1', 'sha256', 'sha512', 'crypto', 'digest'],
  icon: Hash,
  render: HashGeneratorComponent,
};