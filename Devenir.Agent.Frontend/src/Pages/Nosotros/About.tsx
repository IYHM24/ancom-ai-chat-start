import React, { useEffect, useRef } from "react"
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
  BookOpen,
  FileText,
  ShieldAlert,
  Globe,
  ExternalLink
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const About: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!iframe.contentWindow) return;

          if (entry.isIntersecting) {
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "unMute", args: [] }),
              "*"
            );
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "playVideo", args: [] }),
              "*"
            );
          } else {
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
              "*"
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(iframe);

    return () => {
      observer.disconnect();
    };
  }, []);

  const teamMembers = [
    { name: "Miguel Andrey Peña Cárdenas", role: "Ingeniería en Telecomunicaciones" },
    { name: "Cristian Camilo Sierra Daza", role: "Ingeniería en Telecomunicaciones" },
    { name: "Andrés Camilo Gutiérrez González", role: "Ingeniería en Telecomunicaciones" },
    { name: "Martín Felipe Forero Manrique", role: "Ingeniería en Telecomunicaciones" }
  ]

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

  const patentCategories = [
    {
      category: "Modelos de Lenguaje (LLM)",
      icon: Brain,
      color: "text-purple-400 border-purple-800/40 bg-purple-950/20",
      patents: [
        { code: "US 12.354.005 B2", holder: "Google", desc: "Modelos de lenguaje extensos (Familia en EP, CN, JP y KR).", url: "https://patents.google.com/patent/US12354005B2/en" },
        { code: "US 10.452.978 B2", holder: "Google", desc: "Procesamiento y optimización de modelos generativos.", url: "https://patents.google.com/patent/US10452978B2/en" }
      ],
      //legalNote: "Interfiere si se entrena un LLM propio. Al consumir APIs de terceros, aplica revisión de licencias comerciales."
    },
    {
      category: "Clonación y Síntesis de Voz",
      icon: Mic,
      color: "text-blue-400 border-blue-800/40 bg-blue-950/20",
      patents: [
        { code: "US 12,462,787", holder: "USPTO", desc: "Voz conversacional con inteligencia artificial generativa.", url: "https://patents.google.com/patent/US12462787/en" },
        { code: "CN 112365882 A", holder: "China (SIPO)", desc: "Sistemas de síntesis y clonación de voz personalizada.", url: "https://patents.google.com/patent/CN112365882A/en" }
      ],
      //legalNote: "Afecta la viabilidad si se entrena un modelo de voz propio desde cero."
    },
    {
      category: "Persona con LLM & Gemelos Digitales",
      icon: UserCheck,
      color: "text-emerald-400 border-emerald-800/40 bg-emerald-950/20",
      patents: [
        { code: "US 12.333.261 B2", holder: "Morphusai (TW)", desc: "Agentes virtuales persona basados en modelos de lenguaje.", url: "https://patents.google.com/patent/US12333261B2/en" },
        { code: "US 12.513.102 B2", holder: "Meta (PCT WO 2025/117006)", desc: "Emulación de comportamiento humano e identidades futuras.", url: "https://patents.google.com/patent/US12513102B2/en" },
        { code: "WO 2018/217948", holder: "EPO", desc: "Familia de patentes sobre agentes conversacionales personalizados.", url: "https://patents.google.com/patent/WO2018217948A1/en" }
      ],
      //legalNote: "Zona de mayor solapamiento tecnológico. Requiere asesoría legal para patente defensiva."
    }
  ]

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
    <div className="w-full max-w-4xl mx-auto space-y-10 sm:space-y-12 pb-16 pt-2 sm:pt-4 px-3 sm:px-4 text-neutral-100 animate-in fade-in duration-300">
      
      {/* 1. Header principal */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-[11px] sm:text-xs">
          <GraduationCap className="w-4 h-4 text-green-400 flex-none" />
          <span className="truncate">Ingeniería - U. Militar Nueva Granada</span>
        </div>
        
        <p className="text-sm sm:text-base text-neutral-400 font-light max-w-2xl leading-relaxed">
          <strong>Devenir</strong> es una plataforma de IA generativa concebida en la asignatura de <strong>Seminario en Tecnologías</strong>. Permite interactuar con una proyección de ti mismo a 15, 25 o 40 años para transformar tus decisiones presentes.
        </p>

        {/* Reproductor de Video con Autoplay por Scroll */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-800/80 shadow-2xl bg-neutral-900 mt-4 sm:mt-6">
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            src="https://www.youtube.com/embed/milP7IZpd4w?enablejsapi=1&autoplay=1"
            title="Proyecto Devenir - Creadores UMNG"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* 2. Tarjetas de Integrantes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
          <Users className="w-5 h-5 text-green-400" />
          <h2 className="text-base sm:text-lg font-bold text-neutral-200">Equipo de Desarrollo</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
            >
              <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300 font-mono text-xs font-bold flex-none">
                0{idx + 1}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-neutral-200 truncate">{member.name}</h3>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-light truncate">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Base Científica */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-200">Fundamento Científico & Pilares</h2>
          </div>
          <Badge className="bg-purple-950/60 text-purple-300 border-purple-800/50 text-[10px]">
            Hershfield et al. (2011)
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          Investigaciones de <em>Stanford University</em> y <em>London Business School</em> han demostrado que interactuar de forma inmersiva con una proyección de nuestro yo futuro transforma significativamente la toma de decisiones financieras y personales en el presente. Devenir evoluciona este principio combinando tres tecnologías convergentes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

      {/* 4. Submódulo de Patentes y Propiedad Intelectual */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-neutral-200">Vigilancia Tecnológica & Patentes</h2>
          </div>
          <Badge variant="outline" className="border-amber-800/60 bg-amber-950/30 text-amber-300 text-[10px]">
            USPTO / EPO / SIPO / SIC
          </Badge>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          Como parte de la investigación en <strong>Seminario en Tecnologías</strong>, se realizó una búsqueda de patentes internacionales previas para identificar posibles interferencias de propiedad intelectual:
        </p>

        {/* Listado de patentes agrupadas por tecnología */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patentCategories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-black/50 border border-neutral-800/80 hover:border-neutral-700 flex flex-col justify-between space-y-4 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg border w-fit ${cat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-neutral-200">{cat.category}</h3>
                  </div>

                  <div className="space-y-2">
                    {cat.patents.map((pat, pIdx) => (
                      <div key={pIdx} className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-left space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <a 
                            href={pat.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[11px] font-bold text-amber-400 hover:text-amber-300 hover:underline inline-flex items-center gap-1 group/link"
                          >
                            <span>{pat.code}</span>
                            <ExternalLink className="w-3 h-3 opacity-70 group-hover/link:opacity-100 transition-opacity" />
                          </a>
                          <span className="text-[10px] text-neutral-500 font-semibold truncate">{pat.holder}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-light leading-tight">{pat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* {cat.legalNote? <div className="pt-2 border-t border-neutral-800/60 flex items-start gap-1.5 text-[10px] text-neutral-400 font-light">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-none mt-0.5" />
                  <span>{cat.legalNote}</span>
                </div> : <></>} */}
              </div>
            )
          })}
        </div>

        {/* Cuadro informativo sobre legislación en Colombia (SIC) */}
        {/* <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-green-400">
            <Globe className="w-4 h-4" />
            <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Estado Territorial & Novedad en Colombia (SIC)</h4>
          </div>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            No se hallaron patentes registradas ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong> que cubran esta solución en el país. En la Decisión 486 (Art. 15 e) de la Comunidad Andina, el software <em>"como tal"</em> no constituye invención patentable; no obstante, sí lo son las <strong>invenciones implementadas por computador con efecto técnico concreto</strong>.
          </p>
        </div> */}

      </section>

      {/* 5. Metodología Design Thinking */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
          <div className="p-2 rounded-lg bg-green-950/50 border border-green-800/40 text-green-400 flex-none">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-neutral-200">Metodología Usada: Design Thinking</h2>
            <p className="text-[11px] sm:text-xs text-neutral-400 font-light">Marco estructurado iterativo centrado en la empatía y la experiencia de usuario</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {designThinkingSteps.map((item, idx) => {
            const Icon = item.icon
            return (
              <div 
                key={idx}
                className="bg-black/40 border border-neutral-800/80 hover:border-neutral-700 rounded-xl p-4 sm:p-5 space-y-3 transition-colors"
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

      {/* 6. Especificaciones Técnicas */}
      <section className="bg-black/70 border border-neutral-800/80 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-200 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-neutral-400 flex-none" />
              <span>Especificaciones Técnicas del Prototipo</span>
            </h2>
            <p className="text-xs text-neutral-400 font-light mt-1">
              Stack de vanguardia seleccionado para soportar la baja latencia y alta reactividad
            </p>
          </div>
          <Badge className="bg-neutral-800 text-neutral-300 border-neutral-700 font-mono w-fit">Clean Architecture</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          
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

      {/* 7. Pie de página */}
      <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2 text-center sm:text-left">
        <span>Devenir © {new Date().getFullYear()} — Todos los derechos reservados</span>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-green-400" />
          <span>Conversa hoy con quien podrías llegar a ser mañana</span>
        </div>
      </div>

    </div>
  )
}