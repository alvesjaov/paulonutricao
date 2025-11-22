import Counter from "@/components/Counter";

type StatConfig = {
  end: number;
  suffix?: string;
  label: string;
};

const stats: StatConfig[] = [
  { end: 1000, suffix: "+", label: "Pacientes Atendidos" },
  { end: 95, suffix: "%", label: "Taxa de Sucesso" },
  { end: 10, suffix: "+", label: "Anos de Experiência" },
  { end: 4, label: "Locais de Atendimento" },
];

const HeroStats = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
    {stats.map(({ end, suffix, label }) => (
      <div key={label}>
        <Counter
          end={end}
          suffix={suffix}
          className="text-3xl md:text-4xl font-bold text-primary"
        />
        <p className="text-sm text-foreground mt-1">{label}</p>
      </div>
    ))}
  </div>
);

export { HeroStats };
