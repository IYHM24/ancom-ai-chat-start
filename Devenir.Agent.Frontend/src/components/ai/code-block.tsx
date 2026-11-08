import React, { useState } from "react"
import { Copy, Check, Download } from "lucide-react"

interface CodeBlockProps {
  language?: string
  code: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language = "Code", code }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `script.${language.toLowerCase() || "txt"}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="my-4 rounded-2xl bg-[#1e1f20] border border-neutral-800/60 overflow-hidden text-sm">
      {/* Cabecera del bloque de código */}
      <div className="flex items-center justify-between px-4 py-2.5 text-xs text-neutral-400 font-medium border-b border-neutral-800/40">
        <span className="capitalize">{language}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Descargar código"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            title="Copiar código"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Cuerpo del código */}
      <div className="p-4 overflow-x-auto font-mono text-[13.5px] leading-relaxed text-neutral-200 bg-[#141415]">
        <pre>{code}</pre>
      </div>
    </div>
  )
}