import React, { useState, useRef, useEffect, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ChatMessage } from "@/components/ai/chat-message"
import { PromptInput } from "@/components/ai/prompt-input"
import {
  ArrowDown,
  Sparkles,
  Clock,
  Target,
  Compass,
  BrainCircuit,
  ArrowRight,
  Loader2,
  AlertTriangle,
  WifiOff
} from "lucide-react"
import { checkAgentStatus, type PingResponse } from "@/Controllers/AgentController.service"

export const Chat: React.FC = () => {
  const [input, setInput] = useState("")
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Estado de la conexión del agente
  const [agentStatus, setAgentStatus] = useState<PingResponse | null>(null)
  const [isCheckingConnection, setIsCheckingConnection] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: import.meta.env.VITE_BACK_URL + "/api/agent/chat",
    }),
    onError: (error) => {
      console.error("🔴 Error en el stream del SDK:", error)
    },
  })

  const isPending = status === "submitted"
  const isStreaming = status === "streaming"
  const isLoading = isPending || isStreaming

  // Verificación recurrente de la conexión al backend/agente
  useEffect(() => {
    const verifyStatus = async () => {
      const res = await checkAgentStatus()
      setAgentStatus(res)
      setIsCheckingConnection(false)
    }

    verifyStatus()
    const interval = setInterval(verifyStatus, 15000) // Revisa cada 15s si aún no está online

    return () => clearInterval(interval)
  }, [])

  const isConnecting = isCheckingConnection || agentStatus?.status !== "online"

  // Desplazar al fondo del contenedor principal
  const scrollToBottom = useCallback(() => {
    const container = document.getElementById("chat-scroll-container")
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [])

  // Auto-scroll al recibir mensajes o cambiar de estado
  useEffect(() => {
    scrollToBottom()
  }, [messages, status, scrollToBottom])

  // Listener de Scroll para activar/desactivar la flecha flotante
  useEffect(() => {
    const container = document.getElementById("chat-scroll-container")
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const isFarFromBottom = scrollHeight - scrollTop - clientHeight > 80
      setShowScrollButton(isFarFromBottom)
    }

    handleScroll()
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [messages])

  const handleSend = (textToSend?: string) => {
    if (isConnecting) return // Bloqueo si no está conectado
    const query = textToSend || input
    if (!query.trim() || isLoading) return
    sendMessage({ text: query })
    setInput("")

    setTimeout(() => {
      scrollToBottom()
    }, 50)
  }

  // Tarjetas de sugerencia enfocadas en "Tu Yo del Futuro"
  const promptSuggestions = [
    {
      title: "Logros a 5 años",
      description: "¿Qué hitos profesionales y personales habré alcanzado si mantengo este ritmo?",
      icon: Target,
      prompt: "Háblame de los mayores logros que habremos alcanzado juntos dentro de 5 años si sigo ejecutando mis metas actuales.",
      color: "text-emerald-400"
    },
    {
      title: "Consejo ante un dilema",
      description: "Pide perspectiva del futuro para tomar una decisión importante hoy.",
      icon: Compass,
      prompt: "Estoy ante una decisión crucial en mi carrera. Mirando hacia atrás desde el futuro, ¿qué aspectos debería ponderar más?",
      color: "text-blue-400"
    },
    {
      title: "Lecciones y aprendizaje",
      description: "¿De qué errores de mi presente me recomendarías cuidarme ahora mismo?",
      icon: Clock,
      prompt: "¿Cuáles fueron los tropiezos o distracciones más comunes en esta etapa de mi vida que desearías que hubiera evitado?",
      color: "text-purple-400"
    },
    {
      title: "Visión del proyecto 'Devenir'",
      description: "Visualiza cómo ha evolucionado tu sistema y tecnología en el futuro.",
      icon: BrainCircuit,
      prompt: "Cuéntame cómo ha evolucionado nuestra plataforma y qué impacto ha tenido en nuestro trabajo a largo plazo.",
      color: "text-amber-400"
    }
  ]

  return (
    <div className="relative flex-1 flex flex-col justify-between font-sans min-h-full">

      {/* 🚨 OVERLAY Y ALERTA DE CONEXIÓN EN EL CENTRO */}
      {isConnecting && (
        <div className="absolute inset-0 z-40 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 transition-all duration-300">
          <div className="w-full max-w-md bg-[#121212]/95 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">

            {isCheckingConnection ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-green-400" />
              </div>
            ) : agentStatus?.error?.includes("No se pudo establecer conexión") ? (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-950/60 border border-red-800/60 flex items-center justify-center mx-auto text-red-400">
                <WifiOff className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-950/60 border border-amber-800/60 flex items-center justify-center mx-auto text-amber-400">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
              </div>
            )}

            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-neutral-100">
                {isCheckingConnection
                  ? "Verificando Conexión..."
                  : agentStatus?.error?.includes("No se pudo establecer conexión")
                    ? "Sin conexión con el Backend"
                    : "Calentando Agente (Qwen 2.5)"}
              </h3>

              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {isCheckingConnection
                  ? "Estableciendo enlace con el servidor en .NET 10..."
                  : agentStatus?.error?.includes("No se pudo establecer conexión")
                    ? "Para proceder con la ejecución del agente, asegúrese de solicitar la habilitación previa al equipo de soporte. El servicio requiere ser activado internamente antes de estar disponible para pruebas.\nSi desea contactar al equipo el WhatsApp es +57 350 693 0989."
                    : "El modelo local está inicializando la memoria contextual. El chat estará disponible automáticamente en unos segundos."}
              </p>
            </div>

            {/* Indicador visual de espera */}
            <div className="pt-2">
              <div className="w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden border border-neutral-800">
                <div className="bg-linear-to-r from-amber-500 via-green-400 to-amber-500 h-full w-full animate-pulse" />
              </div>
              <span className="text-[10px] text-neutral-500 mt-2 block font-mono">
                Intentando reconectar automáticamente...
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Lista de Mensajes / Pantalla Inicial */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-3 sm:px-4 pb-4 sm:pb-6">
        {messages.length === 0 && !isPending ? (

          /* Hero Section / Portada de Inicio centrada en el Yo del Futuro */
          <div className="min-h-[55vh] sm:min-h-[65vh] flex flex-col items-center justify-center text-center py-4 sm:py-8 space-y-6 sm:space-y-8 animate-in fade-in duration-500">

            {/* Encabezado Principal */}
            <div className="space-y-2 sm:space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-[11px] sm:text-xs mb-1 sm:mb-2">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400 animate-pulse" />
                <span>Conexión Temporal Activa</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-neutral-100 via-neutral-200 to-neutral-400 tracking-tight">
                Habla con tu 'Yo' del futuro
              </h1>

              <p className="text-xs sm:text-base text-neutral-400 font-light leading-relaxed px-1 sm:px-0">
                Haz preguntas sobre tu trayectoria, consulta decisiones estratégicas o explora los escenarios que aguardan en tu horizonte.
              </p>
            </div>

            {/* Grid de Cartas de Recomendación */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 w-full text-left">
              {promptSuggestions.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    disabled={isConnecting}
                    onClick={() => handleSend(item.prompt)}
                    className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border shadow-md transition-all duration-200 text-left overflow-hidden ${isConnecting
                        ? "bg-black/20 border-neutral-900 opacity-50 cursor-not-allowed"
                        : "bg-black/40 hover:bg-neutral-900/70 border-neutral-800/80 hover:border-neutral-700/80 shadow-md hover:shadow-xl cursor-pointer"
                      }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

          </div>

        ) : (

          /* Lista de mensajes durante la conversación */
          <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
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
      <footer className="sticky bottom-0 bg-linear-to-t from-[#0e0e0e] via-[#0e0e0e] to-transparent pt-4 sm:pt-6 pb-4 sm:pb-6 px-3 sm:px-4 z-20">
        <div className="relative max-w-3xl mx-auto">

          {/* Botón Flotante para Scroll */}
          {showScrollButton && !isConnecting && (
            <button
              onClick={scrollToBottom}
              type="button"
              className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 p-2 sm:p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer z-30 flex items-center justify-center active:scale-95"
              title="Ir abajo"
            >
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-200" />
            </button>
          )}

          <div className={isConnecting ? "pointer-events-none opacity-50" : ""}>
            <PromptInput
              value={input}
              onChange={setInput}
              onSubmit={() => handleSend()}
              onStop={stop}
              isLoading={isLoading || isConnecting}
              isPending={isPending}
            />
          </div>

          <div className="text-center mt-3 sm:mt-4 text-[10px] sm:text-xs text-neutral-500">
            <span>Devenir | Todos los derechos reservados © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </div>
  )
}