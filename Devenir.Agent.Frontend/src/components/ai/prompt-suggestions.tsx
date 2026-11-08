import React from "react"
import { Sparkles } from "lucide-react"

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void
}

const SUGGESTIONS = [
  "Explícame qué es Semantic Kernel",
  "¿Cómo funciona el streaming HTTP?",
  "Crea un chiste sobre desarrolladores .NET",
  "Consejos para optimizar React + Tailwind v4"
]

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
      {SUGGESTIONS.map((suggestion, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(suggestion)}
          className="p-3 text-xs text-left bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl text-slate-300 transition-all group flex items-center justify-between"
        >
          <span>{suggestion}</span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>
  )
}