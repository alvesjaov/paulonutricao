import portraitImage from "@/assets/nutritionist-portrait.jpg";
import Timeline from "./timeline/Timeline";
const About = () => {
  return (
    <section
      id="sobre"
      className="py-20 bg-muted/30 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* TITULO */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sobre Mim
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça minha trajetória profissional e acadêmica
            </p>
          </div>

          {/* SOBRE */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

            {/* FOTO */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-3 scale-105" />

              <img
                src={portraitImage}
                alt="Paulo Virgílio"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>

            {/* TEXTO */}
            <div>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Me chamo Paulo, sou Nutricionista formado desde 2014,
                especializado em nutrição esportiva, clínica e fitoterapia.
              </p>

              <p className="text-lg text-foreground leading-relaxed mb-6">
                Praticante de musculação desde 2005, já foi competidor amador Men's Physique, 
                conquistando 2ª colocação em Vitória da Conquista-BA (2016) e 4ª em 
                Itabuna-BA (2015).
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                Atualmente curso Educação Física, ampliando minha visão integrada sobre saúde, movimento humano e performance.
              </p>
            </div>

          </div>

          {/* TIMELINE */}
          <Timeline />

        </div>
      </div>
    </section>
  );
};

export default About;