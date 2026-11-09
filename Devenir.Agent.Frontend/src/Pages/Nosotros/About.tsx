import React from "react"
import { 
  Sparkles, 
  Brain, 
  Cpu, 
  Code2,  
  Layers, 
  GraduationCap,
  Users,
  Lightbulb,
  Target,
  Palette,
  CheckCircle2,
  Workflow
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const About: React.FC = () => {
  // Pasos de Design Thinking aplicados al proyecto Devenir
  const designThinkingSteps = [
    {
      step: "01",
      title: "Empatizar",
      icon: Users,
      color: "border-green-800/60 bg-green-950/20 text-green-400",
      description: "Identificamos la incertidumbre que sienten los usuarios sobre su futuro y cómo la toma de decisiones diarias requiere respaldo, consejo empático y perspectiva preventiva."
    },
    {
      step: "02",
      title: "Definir",
      icon: Target,
      color: "border-blue-800/60 bg-blue-950/20 text-blue-400",
      description: "Concretamos la problemática: los chatbots convencionales son fríos e impersonales. Se requería un agente con identidad propia que actuara verdaderamente como 'Mi Yo del Futuro'."
    },
    {
      step: "03",
      title: "Idear",
      icon: Lightbulb,
      color: "border-amber-800/60 bg-amber-950/20 text-amber-400",
      description: "Diseñamos la dinámica de retroalimentación progresiva: a través de preguntas e interacción constante, la IA refina su perfil de usuario para brindar mejores reflexiones a futuro."
    },
    {
      step: "04",
      title: "Prototipar",
      icon: Palette,
      color: "border-purple-800/60 bg-purple-950/20 text-purple-400",
      description: "Construimos una arquitectura de alta precisión con UI de estética futurista y conexión en tiempo real a un LLM avanzado."
    },
    {
      step: "05",
      title: "Evaluar & Probar",
      icon: CheckCircle2,
      color: "border-emerald-800/60 bg-emerald-950/20 text-emerald-400",
      description: "Desplegamos este prototipo funcional V1.0.0 para validar la experiencia de usuario, la latencia de respuesta y la coherencia narrativa en primera persona."
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 pb-16 pt-4 px-4 text-neutral-100 animate-in fade-in duration-300">
      
      {/* 1. Header con foto horizontal del equipo UMNG */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-xs">
          <GraduationCap className="w-4 h-4 text-green-400" />
          <span>Universidad Militar Nueva Granada — Ingeniería</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-neutral-200 to-neutral-400">
          Devenir | Tu yo del futuro
        </h1>
        
        <p className="text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
          Devenir es el resultado de un proceso de investigación y diseño centrado en el ser humano, desarrollado por estudiantes de Ingeniería en la asignatura de <strong>Seminario en Tecnologías</strong>.
        </p>

        {/* 📸 FOTO HORIZONTAL DEL GRUPO DE CREADORES */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-neutral-800/80 shadow-2xl bg-neutral-900 group mt-6">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="Grupo de Creadores UMNG - Devenir"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e] via-black/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="bg-black/75 backdrop-blur-md border border-neutral-700/60 rounded-xl p-4 max-w-lg shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">Creadores del Proyecto UMNG</span>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Grupo de desarrollo impulsado por los valiosos insumos académicos y técnicos brindados en las clases de Seminario en Tecnologías.
              </p>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex bg-neutral-900/90 border-neutral-700 text-neutral-300 backdrop-blur-md">
              Prototipo V1.0.0
            </Badge>
          </div>
        </div>
      </div>

      {/* 2. Sección Principal: Metodología Design Thinking */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
          <div className="p-2 rounded-lg bg-green-950/50 border border-green-800/40 text-green-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-200">Metodología Usada: Design Thinking</h2>
            <p className="text-xs text-neutral-400 font-light">El marco estructurado que nos guió desde la empatía inicial hasta este prototipo</p>
          </div>
        </div>

        <p className="text-sm text-neutral-300 font-light leading-relaxed">
          Para materializar <strong>Devenir</strong> no partimos directamente del código, sino de la comprensión del usuario. Aplicamos la metodología <strong>Design Thinking</strong> para iterar continuamente la experiencia del "Yo del Futuro", logrando que la IA responda con complicidad, anécdotas y un perfilado que se afina progresivamente con cada conversación.
        </p>

        {/* Pasos de Design Thinking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {designThinkingSteps.map((item, idx) => {
            const Icon = item.icon
            return (
              <div 
                key={idx}
                className="bg-black/40 border border-neutral-800/80 hover:border-neutral-700 rounded-xl p-5 space-y-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg border ${item.color} w-fit flex items-center gap-2`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{item.title}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-600">{item.step}</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. Especificaciones Técnicas del Proyecto (Al Final) */}
      <section className="bg-black/70 border border-neutral-800/80 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-200 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-neutral-400" />
              <span>Especificaciones Técnicas del Prototipo</span>
            </h2>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Stack tecnológico de vanguardia seleccionado para soportar la arquitectura del agente
            </p>
          </div>
          <Badge className="bg-neutral-800 text-neutral-300 border-neutral-700 font-mono">Clean Architecture</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          
          {/* Frontend */}
          <div className="flex flex-col justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-400">
                <Layers className="w-4 h-4" />
                <span className="font-semibold text-neutral-200 text-sm">Frontend</span>
              </div>
              <p className="text-neutral-400 font-light leading-relaxed">
                Construido con TypeScript y arquitectura basada en componentes reutilizables y modulares.
              </p>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">TypeScript | Frontend</span>
          </div>

          {/* Backend */}
          <div className="flex flex-col justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-400">
                <Code2 className="w-4 h-4" />
                <span className="font-semibold text-neutral-200 text-sm">Backend</span>
              </div>
              <p className="text-neutral-400 font-light leading-relaxed">
                Desarrollado en <strong>.NET 10 </strong> integrado con comunicación Server-Sent Events (SSE).
              </p>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">.NET 10 | Backend</span>
          </div>

          {/* Agente de IA */}
          <div className="flex flex-col justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-400">
                <Brain className="w-4 h-4" />
                <span className="font-semibold text-neutral-200 text-sm">Agente IA Base</span>
              </div>
              <p className="text-neutral-400 font-light leading-relaxed">
                Impulsado por el modelo Qwen 2.5, ajustado con un system prompt personalizado para interpretar a 'Tu Yo del Futuro'.
              </p>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Agente</span>
          </div>

        </div>
      </section>

      {/* 4. Pie de página */}
      <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
        <span>Devenir  © Todos los derechos reservados {new Date().getFullYear()}</span>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-green-400" />
          <span>Tu yo del futuro</span>
        </div>
      </div>

    </div>
  )
}