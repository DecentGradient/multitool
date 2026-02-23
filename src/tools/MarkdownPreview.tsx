import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { MultitoolModule } from '../types/MultitoolModule';
import { FileText } from 'lucide-react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

const initialMarkdown = `# Hello Markdown!

This is a live preview of your markdown.

## Features
- **Bold text**
- *Italic text*
- [Links](https://github.com)
- \`Inline code\`

\`\`\`javascript
// Code block
function sayHello() {
  console.log("Hello, World!");
}
\`\`\`

> Blockquotes are also supported.
`;

const MarkdownPreviewComponent: React.FC = () => {
  const [input, setInput] = useState(initialMarkdown);
  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(md.render(input));
  }, [input]);

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Markdown Previewer</h2>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-[400px]">
        <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-[#1e1e1e]">
          <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700">Editor</div>
          <Editor
            height="100%"
            defaultLanguage="markdown"
            theme="vs-dark"
            value={input}
            onChange={(val) => setInput(val || '')}
            options={{ minimap: { enabled: false }, wordWrap: 'on' }}
          />
        </div>
        <div className="flex flex-col border border-slate-700 rounded-md overflow-hidden bg-slate-100">
          <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 border-b border-slate-700 text-slate-200">Preview</div>
          <div 
            className="flex-1 p-6 overflow-y-auto prose prose-slate max-w-none prose-pre:bg-slate-800 prose-pre:text-slate-200"
            dangerouslySetInnerHTML={{ __html: html }} 
          />
        </div>
      </div>
    </div>
  );
};

export const MarkdownPreviewModule: MultitoolModule = {
  id: 'markdown-preview',
  name: 'Markdown Previewer',
  category: 'Text',
  description: 'Write and preview Markdown with live rendering.',
  keywords: ['markdown', 'preview', 'md', 'text', 'render'],
  icon: FileText,
  render: MarkdownPreviewComponent,
};