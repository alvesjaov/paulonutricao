import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import transformation1 from "@/assets/transformation-1.jpg";
import transformation2 from "@/assets/transformation-2.jpg";
import transformation3 from "@/assets/transformation-3.jpg";

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
    result: "Perdeu 18kg em 4 meses",
    testimonial:
      "A consultoria do Paulo mudou completamente minha relação com a comida. Aprendi a comer de forma saudável sem abrir mão do sabor. Os resultados superaram minhas expectativas!",
    image: transformation1,
    rating: 5,
  },
  {
    id: 2,
    name: "Mariana Santos",
    age: 28,
    result: "Ganhou 5kg de massa magra",
    testimonial:
      "Como atleta, eu precisava de um acompanhamento especializado. O Paulo entende de nutrição esportiva como ninguém. Minha performance melhorou drasticamente!",
    image: transformation2,
    rating: 5,
  },
  {
    id: 3,
    name: "Roberto Oliveira",
    age: 42,
    result: "Transformação completa em 6 meses",
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
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

    autoplayRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 20000); // muda a cada 20 segundos

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [currentIndex]);

  return (
    <section
      id="depoimentos"
      className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-16">
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
              className="
                relative
                overflow-hidden shadow-2xl bg-card
                min-h-[420px] md:min-h-[420px]
                flex items-stretch
              "
            >
              {hasImage ? (
                // COM IMAGEM
                <div className="grid md:grid-cols-2 w-full h-full">
                  <div className="relative h-[380px] md:h-full">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />

                    {current.result && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                        {current.result}
                      </div>
                    )}
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
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
                <div className="w-full h-full flex items-center justify-center px-8 md:px-16 py-12">
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
              <div className="absolute bottom-8 right-8 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full hover:bg-primary hover:text-primary-foreground"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full hover:bg-primary hover:text-primary-foreground"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            {/* Pontinhos do carrossel */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
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
