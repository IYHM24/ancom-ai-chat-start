import React, { useState, useRef, useEffect, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ChatMessage } from "@/components/ai/chat-message"
import { PromptInput } from "@/components/ai/prompt-input"
import { ArrowDown } from "lucide-react"

export const Chat: React.FC = () => {
  const [input, setInput] = useState("")
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:5293/api/agent/chat",
    }),
    onError: (error) => {
      console.error("🔴 Error en el stream del SDK:", error)
    },
  })

  const isPending = status === "submitted"
  const isStreaming = status === "streaming"
  const isLoading = isPending || isStreaming

  // Desplazar al fondo
  const scrollToBottom = useCallback(() => {
    const container = document.getElementById("chat-scroll-container")
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [])

  // Auto-scroll cuando llegan mensajes o cambia el estado
  useEffect(() => {
    scrollToBottom()
  }, [messages, status, scrollToBottom])

  // Listener de Scroll para activar la flecha
  useEffect(() => {
    const container = document.getElementById("chat-scroll-container")
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      // Muestra la flecha si el usuario subió más de 80px respecto al final
      const isFarFromBottom = scrollHeight - scrollTop - clientHeight > 80
      setShowScrollButton(isFarFromBottom)
    }

    // Evaluación inicial al cargar
    handleScroll()

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")

    setTimeout(() => {
      scrollToBottom()
    }, 50)
  }

  return (
    <div className="flex-1 flex flex-col justify-between font-sans min-h-full">
      
      {/* Lista de Mensajes */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 pb-6">
        {messages.length === 0 && !isPending ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center text-neutral-400 space-y-3">
            <h1 className="text-3xl font-medium text-neutral-200 tracking-tight">Hola</h1>
            <p className="text-base text-neutral-500">¿En qué te puedo ayudar hoy?</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => {
              const textContent = msg.parts
                ?.filter((part) => part.type === "text")
                .map((part) => part.text)
                .join("") || "";

              const isLastMessage = index === messages.length - 1;
              const isAssistant = msg.role === "assistant";

              const isPendingResponse = isLoading && isAssistant && isLastMessage && !textContent;
              const isActivelyStreaming = isLoading && isAssistant && isLastMessage && textContent.length > 0;

              return (
                <ChatMessage
                  key={msg.id}
                  role={msg.role as "user" | "assistant"}
                  content={textContent}
                  isPending={isPendingResponse}
                  isStreaming={isActivelyStreaming}
                />
              );
            })}

            {isPending && (
              <ChatMessage
                role="assistant"
                content=""
                isPending={true}
              />
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input y Botón Flotante */}
      <footer className="sticky bottom-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e] to-transparent pt-6 pb-6 px-4 z-20">
        <div className="relative max-w-3xl mx-auto">
          
          {/* Botón Flotante para Scroll */}
          {showScrollButton && (
            <button
              onClick={scrollToBottom}
              type="button"
              className="absolute -top-12 left-1/2 -translate-x-1/2 p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer z-30 flex items-center justify-center active:scale-95"
              title="Ir abajo"
            >
              <ArrowDown className="w-4 h-4 text-neutral-200" />
            </button>
          )}

          <PromptInput
            value={input}
            onChange={setInput}
            onSubmit={handleSend}
            onStop={stop}
            isLoading={isLoading}
            isPending={isPending}
          />
          <div className="text-center mt-4 text-xs text-neutral-500">
            <span>Devenir | Todos los derechos reservados © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </div>
  )
}