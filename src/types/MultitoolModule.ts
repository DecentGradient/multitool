import React from "react";

export interface MultitoolModule {
  id: string;
  name: string;
  category: "Crypto" | "Formatters" | "Network" | "Text" | "Converters" | "Encoders";
  description: string;
  keywords: string[];
  icon: React.ComponentType<{ className?: string }>;
  render: React.FC;
}
