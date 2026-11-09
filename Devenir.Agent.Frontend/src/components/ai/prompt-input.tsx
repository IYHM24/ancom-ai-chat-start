import React, { useRef, useEffect } from "react"
import { CornerRightUp, Plus, Square} from "lucide-react"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onStop: () => void
  isLoading: boolean
  isPending: boolean
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
  isPending
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && value.trim()) {
        onSubmit()
      }
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center gap-2 bg-[#1e1f20] hover:bg-[#232426] focus-within:bg-[#232426] border border-neutral-800/80 rounded-full px-4 py-2 transition-all shadow-2xl">
        {/* Botón Adjuntar */}
        <button
          type="button"
          className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 rounded-full transition-colors shrink-0"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Input de texto */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isPending ? "Esperando respuesta..." : "Pregunta a tu 'Yo' del futuro"}
          disabled={isLoading}
          className="flex-1 bg-transparent border-0 resize-none text-[15px] text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-0 px-2 py-1 max-h-36 font-sans leading-normal disabled:opacity-60"
        />

        {/* Acciones de la derecha */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* <button
            type="button"
            className="hidden sm:flex items-center gap-1 text-xs font-medium text-neutral-300 bg-neutral-800/60 hover:bg-neutral-700/60 px-3 py-1.5 rounded-full border border-neutral-700/40 transition-colors"
          >
            <span>Thinking</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button> */}

          {/* <button
            type="button"
            className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 rounded-full transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button> */}

          {/* BOTÓN DINÁMICO: CANCELAR (STOP) vs ENVIAR */}
          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              title="Detener generación"
              className="p-2.5 bg-neutral-100 text-neutral-900 hover:bg-red-500 hover:text-white rounded-full transition-all duration-200 shadow-md group"
            >
              <Square className="w-4 h-4 fill-current group-hover:scale-95 transition-transform" />
            </button>
          ) : (
            value.trim() && (
              <button
                type="button"
                onClick={onSubmit}
                className="p-2.5 bg-neutral-100 text-neutral-900 hover:bg-white rounded-full transition-colors shadow-md"
              >
                <CornerRightUp className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}