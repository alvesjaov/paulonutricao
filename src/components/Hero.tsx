import { Button } from "@/components/ui/button";
import { MapPin, Award } from "lucide-react";
import heroImage from "@/assets/hero-nutrition.jpg";
import Counter from "@/components/Counter";
// Removed counters from hero; they will appear later in evolution section

const Hero = () => {
  const scrollToLocations = () => {
    document.getElementById("locations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex items-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <img
          src={heroImage}
          alt="Nutrição e Saúde"
          className="w-full h-full object-cover transform scale-95 md:scale-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">CRN 7995</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Paulo Virgílio
          </h1>

          <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
            Nutricionista Esportivo e Clínico
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            <div>
              <Counter end={1000} suffix="+" className="text-3xl md:text-4xl font-bold text-primary" />
              <p className="text-sm text-muted-foreground mt-1">Pacientes Atendidos</p>
            </div>
            <div>
              <Counter end={95} suffix="%" className="text-3xl md:text-4xl font-bold text-primary" />
              <p className="text-sm text-muted-foreground mt-1">Taxa de Sucesso</p>
            </div>
            <div>
              <Counter end={10} suffix="+" className="text-3xl md:text-4xl font-bold text-primary" />
              <p className="text-sm text-muted-foreground mt-1">Anos de Experiência</p>
            </div>
            <div>
              <Counter end={4} className="text-3xl md:text-4xl font-bold text-primary" />
              <p className="text-sm text-muted-foreground mt-1">Locais de Atendimento</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
