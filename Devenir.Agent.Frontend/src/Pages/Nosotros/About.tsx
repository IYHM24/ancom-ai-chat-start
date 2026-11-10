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
  Workflow,
  Mic,
  UserCheck,
  BookOpen
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const About: React.FC = () => {
  // Creadores del proyecto Devenir (UMNG - Ingeniería de Telecomunicaciones)
  const teamMembers = [
    { name: "Miguel Andrey Peña Cárdenas", role: "Ingeniería en Telecomunicaciones" },
    { name: "Cristian Camilo Sierra Daza", role: "Ingeniería en Telecomunicaciones" },
    { name: "Andrés Camilo Gutiérrez González", role: "Ingeniería en Telecomunicaciones" },
    { name: "Martín Felipe Forero Manrique", role: "Ingeniería en Telecomunicaciones" }
  ]

  // Tríada tecnológica y sustento científico de Devenir
  const techPillars = [
    {
      title: "Modelos de Lenguaje (LLM)",
      icon: Brain,
      color: "text-purple-400 border-purple-800/40 bg-purple-950/20",
      description: "Sistemas generativos optimizados para sostener una identidad coherente a lo largo del tiempo con narrativa empática en primera persona."
    },
    {
      title: "Clonación de Voz Neuronal",
      icon: Mic,
      color: "text-blue-400 border-blue-800/40 bg-blue-950/20",
      description: "Síntesis neuronal capaz de replicar la identidad vocal mediante audio de alta fidelidad para generar cercanía y presencia."
    },
    {
      title: "Gemelos Digitales Conductuales",
      icon: UserCheck,
      color: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20",
      description: "Modelos computacionales que proyectan decisiones futuras según patrones de comportamiento e interacción del usuario."
    }
  ]

  // Pasos de Design Thinking aplicados al proyecto Devenir
  const designThinkingSteps = [
    {
      step: "01",
      title: "Empatizar",
      icon: Users,
      color: "border-green-800/60 bg-green-950/20 text-green-400",
      description: "Identificamos la incertidumbre sobre el futuro y la necesidad de recibir consejo empático, cercano y reflexivo ante decisiones clave."
    },
    {
      step: "02",
      title: "Definir",
      icon: Target,
      color: "border-blue-800/60 bg-blue-950/20 text-blue-400",
      description: "Constatamos que los asistentes convencionales son impersonales. Se requería un agente con identidad propia: 'Mi Yo del Futuro'."
    },
    {
      step: "03",
      title: "Idear",
      icon: Lightbulb,
      color: "border-amber-800/60 bg-amber-950/20 text-amber-400",
      description: "Diseñamos la dinámica de retroalimentación en primera persona y el ajuste progresivo de contexto a través del diálogo continuo."
    },
    {
      step: "04",
      title: "Prototipar",
      icon: Palette,
      color: "border-purple-800/60 bg-purple-950/20 text-purple-400",
      description: "Construimos una arquitectura limpia de alta precisión con UI futurista y streaming bidireccional en tiempo real."
    },
    {
      step: "05",
      title: "Evaluar & Probar",
      icon: CheckCircle2,
      color: "border-emerald-800/60 bg-emerald-950/20 text-emerald-400",
      description: "Desplegamos el prototipo V1.0.0 para validar la coherencia narrativa, latencia de streaming y la conexión emocional del usuario."
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pb-16 pt-4 px-4 text-neutral-100 animate-in fade-in duration-300">
      
      {/* 1. Header principal */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-xs">
          <GraduationCap className="w-4 h-4 text-green-400" />
          <span>Universidad Militar Nueva Granada — Ingeniería de Telecomunicaciones</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
          Devenir | Tu yo del futuro
        </h1>
        
        <p className="text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
          <strong>Devenir</strong> es una plataforma de IA generativa concebida en la asignatura de <strong>Seminario en Tecnologías</strong>. Permite interactuar con una proyección de ti mismo a 15, 25 o 40 años para transformar tus decisiones presentes.
        </p>

        {/* Banner Fotográfico del Grupo */}
        <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-neutral-800/80 shadow-2xl bg-neutral-900 group mt-6">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="Creadores del Proyecto Devenir - UMNG"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/30 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="bg-black/80 backdrop-blur-md border border-neutral-700/60 rounded-xl p-4 max-w-xl shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">Proyecto Devenir — Creadores UMNG</span>
              </div>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Desarrollado por los estudiantes de Ingeniería en Telecomunicaciones con los conocimientos académicos y tecnológicos de Seminario en Tecnologías.
              </p>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex bg-neutral-900/90 border-neutral-700 text-neutral-300 backdrop-blur-md">
              Prototipo V1.0.0
            </Badge>
          </div>
        </div>
      </div>

      {/* 2. Tarjetas de Integrantes del Equipo */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <Users className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-bold text-neutral-200">Equipo de Desarrollo</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
            >
              <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300 font-mono text-xs font-bold">
                0{idx + 1}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-200">{member.name}</h3>
                <p className="text-xs text-neutral-400 font-light">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Base Científica y Pilares Tecnológicos */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-neutral-200">Fundamento Científico & Pilares</h2>
          </div>
          <Badge className="bg-purple-950/60 text-purple-300 border-purple-800/50 text-[10px]">
            Hershfield et al. (2011)
          </Badge>
        </div>

        <p className="text-sm text-neutral-300 font-light leading-relaxed">
          Investigaciones de <em>Stanford University</em> y <em>London Business School</em> han demostrado que interactuar de forma inmersiva con una proyección de nuestro yo futuro transforma significativamente la toma de decisiones financieras y personales en el presente. Devenir evoluciona este principio combinando tres tecnologías convergentes:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {techPillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-black/50 border border-neutral-800/80 hover:border-neutral-700 space-y-3 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className={`p-2 rounded-lg border w-fit ${pillar.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-200">{pillar.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. Metodología Design Thinking */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
          <div className="p-2 rounded-lg bg-green-950/50 border border-green-800/40 text-green-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-200">Metodología Usada: Design Thinking</h2>
            <p className="text-xs text-neutral-400 font-light">Marco estructurado iterativo centrado en la empatía y la experiencia de usuario</p>
          </div>
        </div>

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

      {/* 5. Especificaciones Técnicas */}
      <section className="bg-black/70 border border-neutral-800/80 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-200 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-neutral-400" />
              <span>Especificaciones Técnicas del Prototipo</span>
            </h2>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Stack de vanguardia seleccionado para soportar la baja latencia y alta reactividad
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
                Desarrollado en React y TypeScript con componentes modulares, Tailwind CSS y UI futurista.
              </p>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">React | TypeScript</span>
          </div>

          {/* Backend */}
          <div className="flex flex-col justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-400">
                <Code2 className="w-4 h-4" />
                <span className="font-semibold text-neutral-200 text-sm">Backend</span>
              </div>
              <p className="text-neutral-400 font-light leading-relaxed">
                Construido sobre <strong>.NET 10</strong> con transmisión continua mediante Server-Sent Events (SSE).
              </p>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">.NET 10 | SSE</span>
          </div>

          {/* Agente IA */}
          <div className="flex flex-col justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-400">
                <Brain className="w-4 h-4" />
                <span className="font-semibold text-neutral-200 text-sm">Agente IA Base</span>
              </div>
              <p className="text-neutral-400 font-light leading-relaxed">
                Impulsado por el modelo Qwen 2.5 y parametrizado con System Instructions de alta inmersión.
              </p>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Qwen 2.5 LLM</span>
          </div>

        </div>
      </section>

      {/* 6. Pie de página */}
      <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
        <span>Devenir © {new Date().getFullYear()} — Todos los derechos reservados</span>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-green-400" />
          <span>Conversa hoy con quien podrías llegar a ser mañana</span>
        </div>
      </div>

    </div>
  )
}