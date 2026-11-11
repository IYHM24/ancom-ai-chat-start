import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { 
  MessageSquarePlus, 
  //History, 
  //Settings, 
  //User, 
  Cpu, 
  Plus, 
  //HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  HeartHandshake,
  Menu,
  X
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { checkAgentStatus, type PingResponse } from "@/Controllers/AgentController.service"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [agentStatus, setAgentStatus] = useState<PingResponse | null>(null)
  const [isChecking, setIsChecking] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Verificación del estado del backend al cargar y cada 30 segundos
  useEffect(() => {
    const verifyStatus = async () => {
      setIsChecking(true)
      const res = await checkAgentStatus()
      setAgentStatus(res)
      setIsChecking(false)
    }

    verifyStatus()
    const interval = setInterval(verifyStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  // Rutas mapeadas para react-router-dom
  const menuItems = [
    { id: "new-chat", label: "Nuevo Chat", icon: MessageSquarePlus, path: "/chat" },
    /* { id: "history", label: "Historial", icon: History, path: "/history" },
    { id: "profile", label: "Mi Perfil", icon: User, path: "/profile" },
    { id: "settings", label: "Configuración", icon: Settings, path: "/settings" },
    { id: "help", label: "Ayuda y Soporte", icon: HelpCircle, path: "/help" }, */
    { id: "nosotros", label: "Nosotros", icon: HeartHandshake, path: "/" }
  ]

  /* const recentChats = [
    "Análisis de negocio",
    "Refactorización C#",
    "Planificación de sprint"
  ] */

  const handleNavigate = (path: string) => {
    debugger;
    navigate(path)
    setMobileMenuOpen(false)
  }

  return (
    <div className="relative w-full bg-[#0e0e0e] text-neutral-100 h-screen flex flex-col overflow-hidden">
      
      {/* Header flotante */}
      <header className="absolute top-0 left-0 right-0 z-40 p-2 sm:p-4 pointer-events-none">
        <div className="flex w-full items-center justify-between bg-black/60 backdrop-blur-md border border-neutral-800/80 rounded-lg shadow-lg p-3 pointer-events-auto">
          
          <div className="flex items-center gap-3">
            {/* Botón menú hamburguesa (solo móvil) */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-neutral-300 hover:text-white rounded-md bg-neutral-900 border border-neutral-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate("/")}>
              <h1 className="text-lg sm:text-xl font-bold tracking-wide">Devenir</h1>
              <strong>|</strong>
              <p className="text-xs sm:text-sm text-neutral-400 font-light truncate">Tu yo del futuro</p>
            </div>
          </div>

          <div className="flex justify-end items-center gap-2 sm:gap-3 text-base sm:text-lg">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400" />
            <strong className="hidden sm:inline text-sm font-semibold">Prototipo</strong>
            <Badge variant="default" className="bg-green-800/80 text-green-200 border border-green-700 text-xs">V1.0.0</Badge>
          </div>
        </div>
      </header>

      {/* Backdrop para cerrar menú en móvil */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Container */}
      <main className="w-full flex flex-1 h-full min-h-0 overflow-hidden gap-4 px-2 sm:px-4">
        
        {/* Sidebar Responsive */}
        <aside className={`
          fixed md:relative top-0 left-0 bottom-0 z-50 md:z-auto
          w-72 md:w-64 flex flex-col gap-2 pt-20 pb-4 flex-none
          bg-[#0e0e0e] md:bg-transparent px-3 md:px-0
          transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="bg-black/70 backdrop-blur-md border border-neutral-800/80 rounded-lg shadow-lg p-3 flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              
              {/* Botón Acción Principal: Ir al Chat Raíz */}
              <button 
                onClick={() => handleNavigate("/chat")}
                className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-100 font-medium py-2 px-3 rounded-md border border-neutral-700/60 transition-all text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4 text-green-400" />
                <span>Nuevo Chat</span>
              </button>

              {/* Lista de Navegación vinculada al Router */}
              <nav className="space-y-1">
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider px-2">Navegación</span>
                {menuItems.slice(1).map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                debugger;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
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
                  {/* {recentChats.map((chat, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavigate("/")}
                      className="w-full text-left truncate px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40 rounded-md transition-colors cursor-pointer"
                    >
                      {chat}
                    </button>
                  ))} */}
                </div>
              </div>
            </div>

            {/* Indicador de Agente Activo con status real */}
            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
              <span className="truncate">{agentStatus?.status === "online" ? "Agente Activo" : "Agente Inactivo"}</span>
              <span 
                className={`w-2 h-2 rounded-full ${
                  agentStatus?.status === "online" 
                    ? "bg-green-500 animate-pulse" 
                    : "bg-amber-500 animate-ping"
                }`} 
              />
            </div>
          </div>

          {/* Tarjeta Dinámica de Estado del Sistema */}
          <div className="bg-black/70 backdrop-blur-md border border-neutral-800/80 rounded-lg shadow-lg p-3 flex-none text-xs">
            {isChecking ? (
              <div className="flex items-center gap-2 text-neutral-400 justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />
                <span>Verificando agente...</span>
              </div>
            ) : agentStatus?.status === "online" ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-medium text-neutral-200">Agente Listo</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {agentStatus.latencyMs}ms
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-1 text-amber-400">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-none" />
                  <span className="font-semibold text-amber-300">Calentando modelo</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-tight">
                  El agente puede demorar unos minutos en responder por primera vez.
                  Si desea contactar al equipo el WhatsApp es +57 350 693 0989.
                </p>
              </div>
            )}
          </div>
        </aside>

        {/* Contenedor principal del scroll */}
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