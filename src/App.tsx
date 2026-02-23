import { useState, useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { MultitoolModule } from "./types/MultitoolModule";
import { Wrench, LayoutDashboard } from "lucide-react";

// Placeholder module registry
const modules: MultitoolModule[] = [];

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [clipboardAlert, setClipboardAlert] = useState<string | null>(null);

  useEffect(() => {
    // Listen for background clipboard changes broadcasted from Tauri
    const unlisten = listen<string>("clipboard://text-changed", (event) => {
      console.log("Clipboard changed:", event.payload);
      
      if (event.payload.startsWith("ey")) {
        setClipboardAlert("JWT token detected in clipboard.");
      } else {
        setClipboardAlert("New text copied to clipboard.");
      }
      
      // Clear alert after a few seconds
      setTimeout(() => setClipboardAlert(null), 5000);
    });

    return () => {
      unlisten.then(f => f());
    };
  }, []);

  const renderContent = () => {
    if (!activeToolId) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Wrench className="w-16 h-16 mb-4 opacity-50" />
          <h2 className="text-xl font-semibold">Welcome to Multitool</h2>
          <p className="mt-2">Select a tool from the sidebar to get started.</p>
          <p className="mt-1 text-sm text-slate-500">Press Cmd/Ctrl + K to search.</p>
        </div>
      );
    }
    const tool = modules.find(m => m.id === activeToolId);
    if (!tool) return <div>Tool not found</div>;
    return <tool.render />;
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans">
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700 flex items-center space-x-2">
          <LayoutDashboard className="w-6 h-6 text-blue-400" />
          <h1 className="font-bold text-lg text-slate-100">Multitool</h1>
        </div>
        <div className="p-2 flex-grow overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-2">Tools</div>
          {modules.map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className={`w-full flex items-center space-x-2 px-2 py-2 rounded-md text-left transition-colors ${
                activeToolId === tool.id ? "bg-blue-600 text-white" : "hover:bg-slate-700 text-slate-300"
              }`}
            >
              <tool.icon className="w-4 h-4" />
              <span>{tool.name}</span>
            </button>
          ))}
          {modules.length === 0 && (
            <div className="text-sm text-slate-500 px-2 italic">No tools loaded.</div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {clipboardAlert && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-bounce z-50">
            <span>{clipboardAlert}</span>
            <button onClick={() => setClipboardAlert(null)} className="font-bold ml-2">×</button>
          </div>
        )}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
