import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CounterProps {
  end: number;            // valor final numérico (ex: 1000)
  duration?: number;      // ms da animação total
  suffix?: string;        // sufixo a ser exibido após o número (ex: '+' ou '%')
  className?: string;     // classes de estilo do wrapper do número
  formatter?: (value: number) => string; // formatação customizada
  start?: number;         // início opcional (default 0)
  once?: boolean;         // anima apenas uma vez (default true)
}

// Componente de contador animado que inicia quando fica visível na viewport
export const Counter = ({
  end,
  duration = 1400,
  suffix = "",
  className,
  formatter,
  start = 0,
  once = true,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(start);
  // Usamos ref para não disparar novo useEffect (evita cancelar animação no primeiro frame)
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frameId: number | undefined;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = start + (end - start) * progress;
      setValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      if (once && hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      frameId = requestAnimationFrame(animate);
    };

    // Fallback: se já está visível na montagem, inicia imediatamente
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom >= 0;
    if (inViewport) {
      startAnimation();
      if (once) return; // sem observer necessário
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          startAnimation();
          if (once) observer.disconnect();
        }
      },
      { threshold: 0 } // dispara assim que qualquer parte aparece
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [end, duration, start, once]);

  const display = formatter
    ? formatter(value)
    : Math.round(value).toLocaleString("pt-BR") + suffix;

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {display}
    </span>
  );
};

export default Counter;