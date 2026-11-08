import React, { useState } from "react"
import { ThumbsUp, ThumbsDown, RotateCcw, Copy, Check, MoreHorizontal, Loader2, Sparkles } from "lucide-react"
import { CodeBlock } from "./code-block"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export interface MessageProps {
  role: "user" | "assistant"
  content: string
  isStreaming?: boolean
  isPending?: boolean // Fiel reflejo de cuando la API está procesando el primer token
  onRetry?: () => void
}

export const ChatMessage: React.FC<MessageProps> = ({
  role,
  content,
  isStreaming,
  isPending,
  onRetry
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Parseador de bloques de código markdown ```lang ... ```
  // const renderFormattedContent = (text: string) => {
  //   const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  //   const parts = []
  //   let lastIndex = 0
  //   let match

  //   while ((match = codeBlockRegex.exec(text)) !== null) {
  //     if (match.index > lastIndex) {
  //       parts.push({ type: "text", content: text.substring(lastIndex, match.index) })
  //     }
  //     parts.push({
  //       type: "code",
  //       language: match[1] || "Bash",
  //       code: match[2].trim()
  //     })
  //     lastIndex = match.index + match[0].length
  //   }

  //   if (lastIndex < text.length) {
  //     parts.push({ type: "text", content: text.substring(lastIndex) })
  //   }

  //   return parts.map((part, index) => {
  //     if (part.type === "code") {
  //       return <CodeBlock key={index} language={part.language} code={part.code || ""} />
  //     }
  //     return (
  //       <p key={index} className="whitespace-pre-wrap leading-relaxed text-[15px] text-neutral-200">
  //         {part.content}
  //       </p>
  //     )
  //   })
  // }

  // Burbuja de mensaje del usuario
  if (role === "user") {
    return (
      <div className="flex justify-end my-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="max-w-[80%] bg-[#282a2c] text-neutral-100 px-5 py-3 rounded-3xl text-[15px] leading-relaxed shadow-sm">
          {content}
        </div>
      </div>
    )
  }

  // Mensaje del Asistente (IA)
  return (
    <div className="flex flex-col gap-2 my-6 text-neutral-200 animate-in fade-in duration-300">
      {/* LOADER: Estado inicial de espera antes de recibir caracteres */}
      {isPending && !content && (
        <div className="flex items-center gap-2.5 text-neutral-400 py-2">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
          <span className="text-sm font-medium animate-pulse flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Pensando...
          </span>
        </div>
      )}

      
      {/* CONTENIDO Y ANIMACIÓN DE ESCRITURA EN STREAMING */}
      {content && (
        <div className="space-y-3 relative">
          
          {/* Pasamos las clases de Tailwind a este div contenedor */}
          <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-[15px] prose-p:text-neutral-200 prose-pre:p-0 prose-pre:bg-transparent">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "")
                  if (!inline && match) {
                    return (
                      <CodeBlock 
                        language={match[1]} 
                        code={String(children).replace(/\n$/, "")} 
                      />
                    )
                  }
                  return (
                    <code className="bg-[#282a2c] text-indigo-300 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          
          {/* Cursor parpadeante estilo mecanografía */}
          {isStreaming && (
            <span className="inline-block w-2 h-4.5 bg-indigo-400 animate-pulse ml-1 align-middle rounded-sm shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
          )}
        </div>
      )}

      {/* ACCIONES INFERIORES (Solo cuando finalizó el streaming) */}
      {!isStreaming && !isPending && content && (
        <div className="flex items-center gap-1 mt-2 text-neutral-400">
          <button className="p-2 rounded-full hover:bg-neutral-800 hover:text-neutral-200 transition-colors">
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-neutral-800 hover:text-neutral-200 transition-colors">
            <ThumbsDown className="w-4 h-4" />
          </button>
          {onRetry && (
            <button
              onClick={onRetry}
              className="p-2 rounded-full hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
              title="Regenerar respuesta"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-neutral-800 hover:text-neutral-200 transition-colors"
            title="Copiar texto completo"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button className="p-2 rounded-full hover:bg-neutral-800 hover:text-neutral-200 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )

  
}