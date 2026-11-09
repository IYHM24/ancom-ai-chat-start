import React, { useState } from "react"
import { 
  MessageSquarePlus, 
  History, 
  Settings, 
  User, 
  Cpu, 
  Plus, 
  HelpCircle, 
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeItem, setActiveItem] = useState("chat")

  const menuItems = [
    { id: "new-chat", label: "Nuevo Chat", icon: MessageSquarePlus, highlight: true },
    { id: "history", label: "Historial", icon: History },
    { id: "profile", label: "Mi Perfil", icon: User },
    { id: "settings", label: "Configuración", icon: Settings },
    { id: "help", label: "Ayuda y Soporte", icon: HelpCircle },
  ]

  const recentChats = [
    "Análisis de negocio",
    "Refactorización C#",
    "Planificación de sprint"
  ]

  return (
    <div className="relative w-full bg-[#0e0e0e] text-neutral-100 h-screen flex flex-col overflow-hidden">
      
      {/* Header flotante */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 pointer-events-none">
        <div className="flex w-full bg-black/60 backdrop-blur-md border border-neutral-800/80 rounded-lg shadow-lg p-3 pointer-events-auto">
          <div className="w-1/2 flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-wide">Devenir</h1>
            <strong>|</strong>
            <p className="text-sm text-neutral-400 font-light">Tu yo del futuro</p>
          </div>
          <div className="w-1/2 flex justify-end items-center gap-3 text-lg">
            <Cpu className="w-6 h-6 text-neutral-400" />
            <strong className="text-sm font-semibold">Prototipo</strong>
            <Badge variant="default" className="bg-green-800/80 text-green-200 border border-green-700">V1.0.0</Badge>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex flex-1 h-full min-h-0 overflow-hidden gap-4 px-4">
        
        {/* Sidebar */}
        <aside className="w-64 flex flex-col gap-2 pt-20 pb-4 flex-none">
          <div className="bg-black/70 backdrop-blur-md border border-neutral-800/80 rounded-lg shadow-lg p-3 flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <button 
                onClick={() => setActiveItem("new-chat")}
                className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-100 font-medium py-2 px-3 rounded-md border border-neutral-700/60 transition-all text-sm"
              >
                <Plus className="w-4 h-4 text-green-400" />
                <span>Nuevo Chat</span>
              </button>

              <nav className="space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-2">Navegación</span>
                {menuItems.slice(1).map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                        isActive 
                          ? "bg-neutral-800/80 text-white font-medium border-l-2 border-green-500" 
                          : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="space-y-1 pt-2">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-2">Recientes</span>
                <div className="space-y-0.5">
                  {recentChats.map((chat, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left truncate px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40 rounded-md transition-colors"
                    >
                      {chat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
              <span className="truncate">Agente Activo</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
          </div>

          <div className="bg-black/70 backdrop-blur-md border border-neutral-800/80 rounded-lg shadow-lg p-3 flex-none flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-center text-xs">El agente puede demorar unos minutos dado a que está calentando</span>
            </div>
          </div>
        </aside>

        {/* 🚩 Asignamos el ID directamente al contenedor que tiene overflow-y-auto */}
        <section 
          id="chat-scroll-container" 
          className="flex-1 flex flex-col min-w-0 min-h-0 overflow-y-auto pt-20"
        >
          <div className="flex flex-col w-full max-w-4xl mx-auto flex-1">
            {children}
          </div>
        </section>

      </main>
    </div>
  )
}