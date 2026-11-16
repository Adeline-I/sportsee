import type {
  BarProps,
  CartesianGridProps,
  XAxisProps,
  YAxisProps,
} from "recharts";

const AXIS_TEXT = { fill: "var(--color-gray)", fillOpacity: 0.6 };

const AXIS_LINE = { stroke: "var(--color-gray)", strokeOpacity: 0.6 };

/** Grille : lignes horizontales en tirets */
export const GRID: CartesianGridProps = {
  vertical: false,
  stroke: "var(--color-gray)",
  strokeOpacity: 0.06,
  strokeDasharray: "2 2",
};

/** Axe X : marge de 25 car Recharts remonte le texte de 3 px */
export const X_AXIS: XAxisProps = {
  tickLine: false,
  tickSize: 0,
  tickMargin: 25,
  height: 40,
  axisLine: AXIS_LINE,
  tick: { ...AXIS_TEXT, fontSize: 12 },
};

/** Axe Y : 4 graduations en nombres entiers */
export const Y_AXIS: YAxisProps = {
  width: "auto",
  tickCount: 4,
  allowDecimals: false,
  tickLine: false,
  tickSize: 0,
  tickMargin: 9,
  axisLine: AXIS_LINE,
  tick: { ...AXIS_TEXT, fontSize: 10 },
};

export const BAR: Partial<BarProps> = { barSize: 14, radius: 30 };
