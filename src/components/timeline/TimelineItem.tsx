import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isLeft: boolean;
}

const TimelineItem = ({
  year,
  title,
  description,
  icon: Icon,
  isLeft
}: TimelineItemProps) => {
  return (
    <div
      className={`
        relative flex
        ${isLeft ? "md:justify-start" : "md:justify-end"}
      `}
    >
      {/* ICONE */}
      <div
        className="
          absolute
          left-0
          md:left-1/2
          md:-translate-x-1/2
          top-5
          z-20
        "
      >
        <div
          className="
            w-10 h-10 md:w-12 md:h-12
            rounded-full
            bg-primary
            text-white
            shadow-md
            flex items-center justify-center
            border-4 border-background
          "
        >
          <Icon className="w-5 h-5 md:w-5 md:h-5" />
        </div>
      </div>

      {/* CARD */}
      <Card
        className="
          ml-16
          md:ml-0
          w-full
          md:w-[42%]
          p-3 md:p-4
          rounded-xl
          border border-border/40
          bg-background
          shadow-sm
        "
      >
        <span className="text-primary font-medium text-xs tracking-wide uppercase">
          {year}
        </span>

        <h4 className="text-lg md:text-xl font-bold text-foreground mt-2 mb-2 leading-tight">
          {title}
        </h4>

        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </Card>
    </div>
  );
};

export default TimelineItem;
