import React, { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ChatMessage } from "@/components/ai/chat-message"
import { PromptInput } from "@/components/ai/prompt-input"

export const Chat: React.FC = () => {
	const [input, setInput] = useState("")
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

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages, status])

	const handleSend = () => {
		if (!input.trim() || isLoading) return
		sendMessage({ text: input })
		setInput("")
	}

	return (
		/* Eliminados min-h-screen y overflow-y-auto para evitar el doble scroll */
		<div className="flex-1 flex flex-col justify-between font-sans min-h-full">
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

			{/* Input fijo en la parte inferior del scroll */}
			<footer className="sticky bottom-0 bg-linear-to-t from-[#0e0e0e] via-[#0e0e0e] to-transparent pt-6 pb-6 px-4 z-10">
				<div className="max-w-3xl mx-auto">
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