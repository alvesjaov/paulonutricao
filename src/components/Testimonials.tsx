import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Star, Quote, Maximize2, X } from "lucide-react";
import transformation1 from "@/assets/transformation-1.jpg";
import transformation2 from "@/assets/transformation-2.jpg";
import transformation3 from "@/assets/transformation-3.jpg";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  age?: number;
  location?: string;
  result?: string;
  testimonial: string;
  image?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Silva",
    age: 35,
    testimonial:
      "A consultoria do Paulo mudou completamente minha relação com a comida. Aprendi a comer de forma saudável sem abrir mão do sabor. Os resultados superaram minhas expectativas!",
    image: transformation1,
    rating: 5,
  },
  {
    id: 2,
    name: "Mariana Santos",
    age: 28,
    testimonial:
      "Como atleta, eu precisava de um acompanhamento especializado. O Paulo entende de nutrição esportiva como ninguém. Minha performance melhorou drasticamente!",
    image: transformation2,
    rating: 5,
  },
  {
    id: 3,
    name: "Roberto Oliveira",
    age: 42,
    testimonial:
      "Depois dos 40, achei que seria impossível ter o corpo que sempre quis. O Paulo provou que com a nutrição certa e dedicação, tudo é possível. Gratidão eterna!",
    image: transformation3,
    rating: 5,
  },
  {
    id: 4,
    name: "Ana Paula Silva",
    location: "Brumado, BA",
    testimonial:
      "O acompanhamento foi excelente! Em poucos meses já vi resultados incríveis na minha saúde e disposição.",
    rating: 5,
  },
  {
    id: 5,
    name: "João Mendes",
    location: "Livramento, BA",
    testimonial:
      "Profissional extremamente competente e atencioso. Me ajudou a atingir meus objetivos de forma saudável.",
    rating: 5,
  },
  {
    id: 6,
    name: "Fernanda Costa",
    location: "Malhada, BA",
    testimonial:
      "Mudou completamente minha relação com a comida. Hoje me sinto mais leve, saudável e feliz!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [preferredHeight, setPreferredHeight] = useState<number | null>(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const nextTestimonial = () => {
    if (isImageExpanded) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (isImageExpanded) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];
  const hasImage = Boolean(current.image);

  const extraDetails = [
    current.age ? `${current.age} anos` : null,
    current.location ?? null,
  ]
    .filter(Boolean)
    .join(" • ");

  // autoplay
  useEffect(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    if (isImageExpanded) return;

    autoplayRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 20000); // muda a cada 20 segundos

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [currentIndex, isImageExpanded]);

  useLayoutEffect(() => {
    if (!cardRef.current) return;
    const measuredHeight = cardRef.current.getBoundingClientRect().height;

    setPreferredHeight((prev) => {
      if (hasImage) return measuredHeight;
      return prev ?? measuredHeight;
    });
  }, [currentIndex, hasImage]);

  useEffect(() => {
    const handleResize = () => {
      if (!cardRef.current) return;
      const measuredHeight = cardRef.current.getBoundingClientRect().height;

      setPreferredHeight((prev) => {
        if (hasImage) return measuredHeight;
        return prev ?? measuredHeight;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hasImage]);

  return (
    <section
      id="depoimentos"
      className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Star className="w-4 h-4 fill-primary" />
              <span className="text-sm font-medium">Resultados Reais</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Transformações que Inspiram
            </h2>
            <p className="text-xl text-muted-foreground">
              Conheça histórias reais de quem transformou a saúde
            </p>
          </div>

          {/* Carrossel */}
          <div className="relative">
            <Card
              ref={cardRef}
              style={preferredHeight ? { minHeight: `${preferredHeight}px` } : undefined}
              className={cn(
                "relative overflow-hidden shadow-2xl bg-card min-h-[340px] md:min-h-[420px]",
                hasImage
                  ? "flex items-stretch"
                  : "grid place-items-center max-w-3xl mx-auto"
              )}
            >
              {hasImage ? (
                // COM IMAGEM
                <div className="grid md:grid-cols-2 w-full h-full">
                  <Dialog open={isImageExpanded} onOpenChange={setIsImageExpanded}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="relative h-[260px] sm:h-[320px] md:h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 text-primary"
                        aria-label="Expandir imagem de transformação"
                      >
                        <img
                          src={current.image}
                          alt={current.name}
                          className="w-full h-full object-cover rounded-t-xl md:rounded-none"
                        />

                        {current.result && (
                          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                            {current.result}
                          </div>
                        )}

                        <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground shadow">
                          <Maximize2 className="h-3.5 w-3.5" />
                          <span>Expandir</span>
                        </span>
                      </button>
                    </DialogTrigger>

                    <DialogContent
                      className="max-w-4xl w-[90vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none rounded-xl sm:rounded-2xl overflow-hidden"
                      closeButtonClassName="right-2 top-2 sm:right-4 sm:top-4 p-2 text-primary hover:text-primary/80 focus:ring-0 focus:ring-offset-0"
                      closeIcon={<X className="h-6 w-6" strokeWidth={3} />}
                    >
                      <img
                        src={current.image}
                        alt={current.name}
                        className="w-full h-full object-cover"
                      />
                    </DialogContent>
                  </Dialog>

                  <div className="p-6 md:p-12 flex flex-col justify-center">
                    <div className="max-w-xl">
                      <Quote className="w-12 h-12 text-primary/20 mb-4" />

                      <div className="flex gap-1 mb-4">
                        {[...Array(current.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>

                      <blockquote className="text-lg text-foreground leading-relaxed mb-6">
                        "{current.testimonial}"
                      </blockquote>

                      <div>
                        <div className="font-bold text-xl">{current.name}</div>
                        {extraDetails && (
                          <div className="text-muted-foreground">{extraDetails}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // SÓ TEXTO — FORMATAÇÃO ALINHADA
                <div className="w-full h-full flex items-center justify-center px-6 md:px-16 py-10 md:py-12">
                  <div className="max-w-2xl w-full mx-auto">
                    <Quote className="w-12 h-12 text-primary/20 mb-4" />

                    <div className="flex gap-1 mb-4">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>

                    <blockquote className="text-lg text-foreground leading-relaxed mb-6 whitespace-pre-line">
                      "{current.testimonial}"
                    </blockquote>

                    <div>
                      <div className="font-bold text-xl">{current.name}</div>
                      {extraDetails && <div className="text-muted-foreground mt-1">{extraDetails}</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* Botões fixos (mesmo lugar em todos os slides) */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  disabled={isImageExpanded}
                  className="rounded-full hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  disabled={isImageExpanded}
                  className="rounded-full hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            {/* Pontinhos do carrossel */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isImageExpanded) setCurrentIndex(index);
                  }}
                  disabled={isImageExpanded}
                  className={cn(
                    "h-2 rounded-full transition-all disabled:cursor-not-allowed disabled:opacity-40",
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Ver depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
