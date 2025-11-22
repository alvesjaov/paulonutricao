import type { LucideIcon } from "lucide-react";
import {
    Apple,
    Salad,
    Sprout,
    UtensilsCrossed,
    CupSoda,
    Scale,
    Activity,
    Dumbbell,
    Flame,
    BikeIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
    MdEmojiFoodBeverage,
    MdFitnessCenter,
    MdHealthAndSafety,
    MdKebabDining,
    MdLocalDining,
    MdLocalDrink,
    MdOutdoorGrill,
    MdRamenDining,
    MdRestaurant,
    MdSelfImprovement,
    MdSetMeal,
    MdSpa,
    MdSportsEsports,
    MdSportsFootball,
    MdSportsGymnastics,
    MdSportsSoccer,
    MdWaterDrop,
} from "react-icons/md";

type IconComponent = LucideIcon | IconType;

const iconPattern = [
    Apple,
    Salad,
    Sprout,
    UtensilsCrossed,
    CupSoda,
    Scale,
    Activity,
    Dumbbell,
    BikeIcon,
    MdSportsGymnastics,
    MdSportsSoccer,
    MdRestaurant,
    MdLocalDining,
    MdLocalDrink,
    MdFitnessCenter,
    MdSelfImprovement,
    MdSpa,
    MdEmojiFoodBeverage,
    MdSetMeal,
    MdOutdoorGrill,
    MdRamenDining,
    MdKebabDining,
] satisfies readonly IconComponent[];

type IconConfig = {
    Icon: IconComponent;
    top: number;
    left: number;
    size: number;
    opacity: number;
};

const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
};

const buildIconSand = (cols: number, rows: number, density: number) => {
    const configs: IconConfig[] = [];

    for (let row = 0; row < rows; row++) {
        const topBase = (row / (rows - 1)) * 100;

        for (let col = 0; col < cols; col++) {
            const leftBase = (col / (cols - 1)) * 100;
            const seed = row * cols + col;

            if (pseudoRandom(seed) < density) continue;

            const Icon = iconPattern[seed % iconPattern.length];
            const jitterX = (pseudoRandom(seed + 100) - 0.5) * 3;
            const jitterY = (pseudoRandom(seed + 200) - 0.5) * 2;

            const size = 25 + Math.round(pseudoRandom(seed + 400) * 4) * 5;
            const opacity = 0.3 + ((leftBase - 50) / 25) * 0.25;

            const top = topBase + jitterY;
            const left = leftBase + jitterX;
            const minDistance = 4 + size / 20;

            const tooClose = configs.some((c) => {
                const dx = c.left - left;
                const dy = c.top - top;
                return Math.sqrt(dx * dx + dy * dy) < minDistance;
            });
            if (tooClose) continue;

            configs.push({ Icon, top, left, size, opacity });
        }
    }

    return configs;
};

const buildIconSandMobile = (cols: number, rows: number, density: number) => {
    const configs: IconConfig[] = [];

    for (let row = 0; row < rows; row++) {
        const topBase = (row / (rows - 1)) * 100;

        for (let col = 0; col < cols; col++) {
            const leftBase = (col / (cols - 1)) * 100;
            const seed = row * cols + col;

            if (pseudoRandom(seed) < density) continue;

            const Icon = iconPattern[seed % iconPattern.length];
            const jitterX = (pseudoRandom(seed + 300) - 0.5) * 3;
            const jitterY = (pseudoRandom(seed + 400) - 0.5) * 2;

            const size = 18 + Math.round(pseudoRandom(seed + 500) * 2) * 4;
            const opacity = 0.12 + pseudoRandom(seed + 600) * 0.12;

            const top = topBase + jitterY;
            const left = leftBase + jitterX;
            const minDistance = 4 + size / 24;

            const tooClose = configs.some((c) => {
                const dx = c.left - left;
                const dy = c.top - top;
                return Math.sqrt(dx * dx + dy * dy) < minDistance;
            });
            if (tooClose) continue;

            configs.push({ Icon, top, left, size, opacity });
        }
    }

    return configs;
};

const iconSand = buildIconSand(32, 22, 0.1);
const iconSandMobile = buildIconSandMobile(12, 22, 0.18);

const variantConfig = {
    desktop: {
        configs: iconSand,
        className: "absolute inset-0 pointer-events-none z-0 hidden sm:block",
    },
    mobile: {
        configs: iconSandMobile,
        className: "absolute inset-0 pointer-events-none z-0 sm:hidden",
    },
} as const;

type IconSandProps = {
    variant: keyof typeof variantConfig;
};

const IconSand = ({ variant }: IconSandProps) => {
    const { configs, className } = variantConfig[variant];

    return (
        <div className={className}>
            {configs.map(({ Icon, top, left, size, opacity }, idx) => (
                <div
                    key={idx}
                    className="absolute"
                    style={{ top: `${top}%`, left: `${left}%`, opacity }}
                >
                    <Icon size={size} color="hsl(var(--primary))" />
                </div>
            ))}
        </div>
    );
};

export { IconSand };
