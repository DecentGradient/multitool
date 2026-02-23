import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { MultitoolModule } from "../types/MultitoolModule";
import { Search } from "lucide-react";

interface CommandPaletteProps {
  modules: MultitoolModule[];
  onSelect: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ modules, onSelect, isOpen, setIsOpen }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const fuse = new Fuse(modules, {
    keys: ["name", "description", "keywords", "category"],
    threshold: 0.3,
  });

  const results = query ? fuse.search(query).map(result => result.item) : modules;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50" onClick={() => setIsOpen(false)}>
      <div 
        className="bg-slate-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-slate-700"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-slate-700">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-slate-200 placeholder-slate-400 focus:outline-none"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((tool) => (
                <button
                  key={tool.id}
                  className="w-full flex flex-col items-start px-3 py-2 rounded-md hover:bg-blue-600 text-left transition-colors text-slate-200"
                  onClick={() => {
                    onSelect(tool.id);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <tool.icon className="w-4 h-4" />
                    <span className="font-medium">{tool.name}</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">{tool.description}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-slate-500">
              No tools found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
