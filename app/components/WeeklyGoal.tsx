import { Pie, PieChart, type PieLabelRenderProps } from "recharts";
import { pluralize } from "~/utils/format";

type WeeklyGoalProps = {
  sessions: number;
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

/** Placement de l'étiquette selon le côté du donut (textAnchor de Recharts) : décalage de la zone, puis alignement dedans */
const LABEL_PLACEMENT = {
  start: { shift: 0, justify: "justify-start" },
  middle: { shift: 0.5, justify: "justify-center" },
  end: { shift: 1, justify: "justify-end" },
};

/** Étiquette de chaque part, dans un foreignObject (seul moyen d'afficher du HTML dans un SVG) ; rien pour une part vide */
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

/** Objectif hebdomadaire : donut des courses réalisées et restantes */
const WeeklyGoal = ({ sessions, goal }: WeeklyGoalProps) => {
  // Jamais négatif, même si l'objectif est dépassé
  const remaining = Math.max(goal - sessions, 0);

  const data = [
    {
      name: pluralize(remaining, "restante", "restantes"),
      value: remaining,
      fill: "var(--color-blue-30)",
    },
    {
      name: pluralize(sessions, "réalisée", "réalisées"),
      value: sessions,
      fill: "var(--color-blue)",
    },
  ];

  return (
    <div className="flex flex-col gap-12 rounded-[10px] bg-white px-9.5 pt-4 pb-8 shadow-card">
      <div className="flex flex-col gap-4 leading-tight">
        <p className="text-h3 text-blue">
          x{sessions}{" "}
          <span className="text-body-lg text-blue-30">
            sur objectif de {goal}
          </span>
        </p>
        <p className="text-body text-gray/60">
          Courses hebdomadaires réalisées
        </p>
      </div>
      {/* overflow-visible : les étiquettes peuvent déborder du graphique, dans la marge de la carte */}
      <div
        className="[&_svg]:overflow-visible"
        role="img"
        aria-label={`${sessions} ${pluralize(sessions, "course réalisée", "courses réalisées")}, ${remaining} ${pluralize(remaining, "restante", "restantes")}`}
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
