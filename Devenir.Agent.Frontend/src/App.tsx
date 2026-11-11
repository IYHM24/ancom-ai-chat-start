import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/container/Layaout"
import { Chat } from "./Pages/Chat/Chat"
import { About } from "./Pages/Nosotros/About"

// Componentes temporales de marcador para las otras secciones de la Sidebar
/* const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-center text-neutral-400 space-y-2 min-h-full">
    <h2 className="text-2xl font-semibold text-neutral-200">{title}</h2>
    <p className="text-sm text-neutral-500">Esta sección está en desarrollo.</p>
  </div>
) */

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Ruta raíz: Chat */}
          <Route path="/chat" element={<Chat />} />

          {/* Rutas de la Sidebar */}
          {/* <Route path="/history" element={<PlaceholderPage title="Historial de Conversaciones" />} />
          <Route path="/profile" element={<PlaceholderPage title="Mi Perfil" />} />
          <Route path="/settings" element={<PlaceholderPage title="Configuración" />} />
          <Route path="/help" element={<PlaceholderPage title="Ayuda y Soporte" />} /> */}
          <Route path="/" element={<About />} />
            
          {/* Redirección para cualquier ruta desconocida a la raíz */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App