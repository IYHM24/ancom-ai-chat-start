import React from "react"
import { Sparkles, Cpu } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full!">
      {/* Main Container */}
      <main>
        {children}
      </main>
    </div>
  )
}