"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Award } from "lucide-react";
import { IconSand } from "@/components/hero/IconSand";
import { HeroStats } from "@/components/hero/HeroStats";

const Hero = () => {
  const scrollToLocations = () => {
    document
      .getElementById("locations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-background"
    >
      <IconSand variant="mobile" />
      <IconSand variant="desktop" />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/70 text-white mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">CRN 7995</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Paulo Virgílio
          </h1>

          <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
            Nutricionista Esportivo e Clínico
          </p>

          <p className="text-lg text-foreground mb-8 max-w-2xl leading-relaxed">
            Transforme sua saúde com acompanhamento nutricional personalizado.
            Especialista em nutrição esportiva, clínica e fitoterapia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={scrollToLocations}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Ver Locais de Atendimento
            </Button>
          </div>

          <HeroStats />
        </div>
      </div>
    </section>
  );
};

export default Hero;
