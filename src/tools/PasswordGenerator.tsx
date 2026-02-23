import React, { useState, useEffect } from 'react';
import { MultitoolModule } from '../types/MultitoolModule';
import { KeyRound, RefreshCw, Copy } from 'lucide-react';

const PasswordGeneratorComponent: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (excludeSimilar) {
      charset = charset.replace(/[ilLI|`oO01]/g, '');
    }

    if (charset === '') {
      setPassword('');
      return;
    }

    let result = '';
    // Use secure random if available
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, uppercase, lowercase, numbers, symbols, excludeSimilar]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full pt-8 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Password Generator</h2>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
        <div className="relative mb-8">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full bg-[#1e1e1e] border border-slate-600 rounded-lg py-4 px-4 text-2xl font-mono text-center text-slate-200 focus:outline-none"
          />
          <div className="absolute right-2 top-2 flex space-x-2">
            <button
              onClick={generatePassword}
              className="p-2 text-slate-400 hover:text-blue-400 bg-slate-800 rounded-md transition-colors"
              title="Regenerate"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleCopy}
              className={`p-2 rounded-md transition-colors ${copied ? 'text-green-400 bg-green-900/30' : 'text-slate-400 hover:text-blue-400 bg-slate-800'}`}
              title="Copy"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-slate-400 uppercase">Length</label>
              <span className="text-sm text-slate-300 font-mono">{length}</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-5 h-5 rounded bg-[#1e1e1e] border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-slate-200 transition-colors">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="w-5 h-5 rounded bg-[#1e1e1e] border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-slate-200 transition-colors">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
                className="w-5 h-5 rounded bg-[#1e1e1e] border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-slate-200 transition-colors">Numbers (0-9)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
                className="w-5 h-5 rounded bg-[#1e1e1e] border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-slate-200 transition-colors">Symbols (!@#$...)</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group col-span-2 mt-2">
              <input
                type="checkbox"
                checked={excludeSimilar}
                onChange={(e) => setExcludeSimilar(e.target.checked)}
                className="w-5 h-5 rounded bg-[#1e1e1e] border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-slate-300 group-hover:text-slate-200 transition-colors">Exclude Similar Characters (i, l, 1, L, o, 0, O)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PasswordGeneratorModule: MultitoolModule = {
  id: 'password-generator',
  name: 'Password Generator',
  category: 'Crypto',
  description: 'Generate secure random passwords.',
  keywords: ['password', 'generator', 'secure', 'random', 'key'],
  icon: KeyRound,
  render: PasswordGeneratorComponent,
};