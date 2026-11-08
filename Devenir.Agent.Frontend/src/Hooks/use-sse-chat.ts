import { useState, useRef, useCallback } from "react"
import { fetchEventSource } from "@microsoft/fetch-event-source"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const API_URL = "http://localhost:5293/api/agent/chat"

export function useSseChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (prompt: string) => {
    if (!prompt.trim() || isLoading) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: prompt }
    const assistantId = (Date.now() + 1).toString()
    const assistantMessage: Message = { id: assistantId, role: "assistant", content: "" }

    // Preparamos la nueva lista incluyendo la pregunta actual
    const updatedMessages = [...messages, userMessage]

    setMessages([...updatedMessages, assistantMessage])
    setIsLoading(true)

    abortControllerRef.current = new AbortController()

    try {
      await fetchEventSource(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream"
        },
        // Enviamos la lista completa de mensajes simplificada (solo role y content)
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content }))
        }),
        signal: abortControllerRef.current.signal,

        onopen(response) {
          if (response.ok && response.headers.get("content-type")?.includes("text/event-stream")) {
            return Promise.resolve()
          }
          throw new Error(`Error en conexión SSE: ${response.status}`)
        },

        onmessage(ev) {
          if (ev.data === "[DONE]") {
            setIsLoading(false)
            return
          }

          try {
            const parsed = JSON.parse(ev.data)
            if (parsed.delta) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId
                    ? { ...msg, content: msg.content + parsed.delta }
                    : msg
                )
              )
            }
          } catch (err) {
            console.error("Error al parsear fragmento SSE:", err)
          }
        },

        onerror(err) {
          console.error("Error en SSE Stream:", err)
          setIsLoading(false)
          throw err
        },

        onclose() {
          setIsLoading(false)
        }

      })
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: "⚠️ *Error de conexión con el servidor SSE.*" }
              : msg
          )
        )
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [messages, isLoading])

  const stopStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsLoading(false)
    }
  }, [])

  return { messages, isLoading, sendMessage, stopStream }
}