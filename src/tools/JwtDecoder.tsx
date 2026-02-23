import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { Key } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const JwtDecoderComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [headerOutput, setHeaderOutput] = useState('');
  const [payloadOutput, setPayloadOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input.trim()) {
      setHeaderOutput('');
      setPayloadOutput('');
      setError(null);
      return;
    }

    try {
      const header = jwtDecode(input, { header: true });
      const payload = jwtDecode(input);
      
      setHeaderOutput(JSON.stringify(header, null, 2));
      setPayloadOutput(JSON.stringify(payload, null, 2));
      setError(null);
    } catch (e: any) {
      setError("Invalid JWT token");
      setHeaderOutput('');
      setPayloadOutput('');
    }
  }, [input]);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">JWT Decoder</h2>
      </div>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-md">
          {error}
        </div>
      )}

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-[400px]">
        <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
          <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Encoded JWT Token</div>
          <Editor
            height="100%"
            defaultLanguage="plaintext"
            theme="vs-dark"
            value={input}
            onChange={(val) => setInput(val || '')}
            options={{ minimap: { enabled: false }, wordWrap: 'on' }}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex-1 flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
            <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Header</div>
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-dark"
              value={headerOutput}
              options={{ readOnly: true, minimap: { enabled: false } }}
            />
          </div>
          <div className="flex-[2] flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
            <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Payload</div>
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs-dark"
              value={payloadOutput}
              options={{ readOnly: true, minimap: { enabled: false } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const JwtDecoderModule: MultitoolModule = {
  id: 'jwt-decoder',
  name: 'JWT Decoder',
  category: 'Encoders',
  description: 'Decode and inspect JSON Web Tokens.',
  keywords: ['jwt', 'token', 'decode', 'auth', 'bearer'],
  icon: Key,
  render: JwtDecoderComponent,
};