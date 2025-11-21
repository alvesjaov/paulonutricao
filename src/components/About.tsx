import { Award, Dumbbell, GraduationCap, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import portraitImage from "@/assets/nutritionist-portrait.jpg";

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: "Formação",
      description: "Nutricionista desde 2014"
    },
    {
      icon: GraduationCap,
      title: "Especializações",
      description: "Nutrição Esportiva, Clínica e Fitoterapia"
    },
    {
      icon: Dumbbell,
      title: "Experiência",
      description: "Praticante de musculação desde 2005"
    },
    {
      icon: Trophy,
      title: "Competidor",
      description: "2º lugar Men's Physique - Vitória da Conquista (2016)"
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Sobre Mim
            </h2>
            <p className="text-xl text-muted-foreground">
              Conheça minha trajetória profissional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Me chamo Paulo, sou Nutricionista formado desde 2014. Especializado em 
                nutrição esportiva, clínica e fitoterapia.
              </p>
              <p className="text-lg text-foreground leading-relaxed mb-6">
                Adoro musculação e treino desde 2005. Já fui competidor amador Men's Physique, 
                onde consegui 2ª colocação em Vitória da Conquista-BA (2016) e 4ª em 
                Itabuna-BA (2015).
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Atualmente estou cursando também Educação Física, buscando sempre ampliar 
                meus conhecimentos para oferecer o melhor atendimento aos meus pacientes.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3" />
                <img
                  src={portraitImage}
                  alt="Paulo Virgílio - Nutricionista"
                  className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-lg transition-shadow bg-card"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
