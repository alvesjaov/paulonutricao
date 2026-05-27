import {
  Briefcase,
  GraduationCap,
  Hospital,
  ShieldCheck,
  Stethoscope,
  Users,
  LucideIcon
} from "lucide-react";
import TimelineItem from "./TimelineItem";

interface TimelineData {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const Timeline = () => {
  const timeline: TimelineData[] = [
    {
      year: "2009 - 2014",
      title: "Graduação e Pós-Graduação",
      description:
        "Formação em Nutrição com especialização em Nutrição Esportiva, Clínica e Fitoterapia.",
      icon: GraduationCap
    },
    {
      year: "2014 — Presente",
      title: "Atendimento Nutricional Personalizado",
      description:
        "Acompanhamento individualizado com foco em emagrecimento, hipertrofia, performance esportiva e qualidade de vida.",
      icon: Users
    },
    {
      year: "2016 - 2019",
      title: "Nutricionista Clínico Hospitalar",
      description:
        "Atuação hospitalar com foco em acompanhamento clínico e planejamento nutricional.",
      icon: Hospital
    },
    {
      year: "2019 - 2020",
      title: "Nutricionista no NASF",
      description:
        "Atendimento multidisciplinar e suporte nutricional na atenção básica.",
      icon: Stethoscope
    },
    {
      year: "2020 - 2021",
      title: "Saúde Pública em Brumado",
      description:
        "Orientação alimentar e acompanhamento nutricional em unidades de saúde.",
      icon: Briefcase
    },
    {
      year: "2021 - 2025",
      title: "Vigilância Sanitária Municipal",
      description:
        "Coordenação de equipes e atuação em fiscalização sanitária e saúde pública.",
      icon: ShieldCheck
    }
  ];

  return (
    <div id="experiencia" className="max-w-5xl mx-auto scroll-mt-24">
      <div className="text-center mb-14">
        <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Jornada Profissional
        </h3>

        <p className="text-lg text-muted-foreground">
          Atuação profissional voltada à nutrição clínica, esportiva, saúde pública e acompanhamento personalizado.
        </p>
      </div>

      <div className="relative">
        {/* LINHA DESKTOP */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-primary/15 -translate-x-1/2 rounded-full" />

        {/* LINHA MOBILE */}
        <div className="md:hidden absolute left-6 top-0 h-full w-[2px] bg-primary/15 rounded-full" />

        <div className="space-y-4 md:space-y-6">
          {timeline.map((item, index) => (
            <TimelineItem
              key={index}
              year={item.year}
              title={item.title}
              description={item.description}
              icon={item.icon}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
