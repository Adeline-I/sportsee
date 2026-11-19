import type { ReactNode } from "react";

type LegendItem = {
  label: string;
  /** Classe de couleur du point */
  color?: string;
  /** Symbole affiché à la place du point (Graphique BPM : Moyenne BPM) */
  symbol?: ReactNode;
};

type ChartLegendProps = {
  items: LegendItem[];
};

/** Légende d'un graphique : un point de couleur (ou un symbole) devant chaque libellé */
const ChartLegend = ({ items }: ChartLegendProps) => (
  <ul className="flex gap-4 text-body-sm text-gray/60">
    {items.map(({ label, color, symbol }) => (
      <li key={label} className="flex items-center gap-[3.5px]">
        <span aria-hidden="true" className="flex">
          {symbol ?? <span className={`size-2 rounded-full ${color}`} />}
        </span>
        {label}
      </li>
    ))}
  </ul>
);

export default ChartLegend;
