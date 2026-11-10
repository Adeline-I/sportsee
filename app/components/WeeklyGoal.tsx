import { Pie, PieChart, type PieLabelRenderProps } from "recharts";
import { pluralize } from "~/utils/format";

type WeeklyGoalProps = {
  /** Courses réalisées cette semaine */
  done: number;
  goal: number;
};

type SliceLabelProps = {
  color?: string;
  text: string;
};

/** Étiquette d'une part : un point de couleur, puis le texte */
const SliceLabel = ({ color, text }: SliceLabelProps) => (
  <div className="flex items-center gap-1 text-caption text-gray/60">
    <svg width="6.5" height="6.5" aria-hidden="true">
      <circle cx="3.25" cy="3.25" r="3.25" fill={color} />
    </svg>
    {text}
  </div>
);

const LABEL_WIDTH = 100;
const LABEL_HEIGHT = 16;

/**
 * Placement de la zone autour du repère, selon le côté du donut (textAnchor donné par Recharts).
 * - shift : part de la zone placée avant le repère
 * - justify : alignement de l'étiquette dans la zone
 */
const LABEL_PLACEMENT = {
  start: { shift: 0, justify: "justify-start" },
  middle: { shift: 0.5, justify: "justify-center" },
  end: { shift: 1, justify: "justify-end" },
};

/**
 * Étiquette d'une part, appelée par Recharts pour chaque part.
 * Le HTML est placé dans un foreignObject, obligatoire pour afficher du HTML dans un SVG.
 * Rien n'est affiché pour une part vide.
 */
const renderLabel = ({
  x,
  y,
  textAnchor,
  fill,
  value,
  name,
}: PieLabelRenderProps) => {
  if (value === 0) return null;

  const { shift, justify } =
    LABEL_PLACEMENT[textAnchor as keyof typeof LABEL_PLACEMENT];

  return (
    <foreignObject
      x={Math.round(x - LABEL_WIDTH * shift)}
      y={Math.round(y - LABEL_HEIGHT / 2)}
      width={LABEL_WIDTH}
      height={LABEL_HEIGHT}
    >
      <div className={`flex h-full items-center ${justify}`}>
        <SliceLabel color={fill} text={`${value} ${name}`} />
      </div>
    </foreignObject>
  );
};

/**
 * Objectif hebdomadaire : courses réalisées et restantes, avec un donut.
 * Les restantes ne sont jamais négatives, même si l'objectif est dépassé.
 * Ses étiquettes peuvent déborder un peu du graphique, dans la marge de la carte (overflow-visible).
 */
const WeeklyGoal = ({ done, goal }: WeeklyGoalProps) => {
  const remaining = Math.max(goal - done, 0);

  const data = [
    {
      name: pluralize(remaining, "restante", "restantes"),
      value: remaining,
      fill: "var(--color-blue-30)",
    },
    {
      name: pluralize(done, "réalisée", "réalisées"),
      value: done,
      fill: "var(--color-blue)",
    },
  ];

  return (
    <div className="flex flex-col gap-12 rounded-[10px] bg-white px-9.5 pt-4 pb-8 shadow-card">
      <div className="flex flex-col gap-4 leading-tight">
        <p className="text-h3 text-blue">
          x{done}{" "}
          <span className="text-body-lg text-blue-30">
            sur objectif de {goal}
          </span>
        </p>
        <p className="text-body text-gray/60">
          Courses hebdomadaires réalisées
        </p>
      </div>
      <div
        className="[&_svg]:overflow-visible"
        role="img"
        aria-label={`${done} ${pluralize(done, "course réalisée", "courses réalisées")}, ${remaining} ${pluralize(remaining, "restante", "restantes")}`}
      >
        <PieChart
          responsive
          style={{ width: "100%", height: 180 }}
          accessibilityLayer={false}
        >
          <Pie
            data={data}
            dataKey="value"
            innerRadius={40}
            outerRadius={81}
            cornerRadius={2.45}
            stroke="none"
            label={renderLabel}
            labelLine={false}
            rootTabIndex={-1}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default WeeklyGoal;
