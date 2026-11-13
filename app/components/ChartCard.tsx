import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  color: "blue" | "orange";
  subtitle: string;
  period: ReactNode;
  children: ReactNode;
};

const colorClasses = {
  blue: "text-blue",
  orange: "text-orange",
};

const ChartCard = ({
  title,
  color,
  subtitle,
  period,
  children,
}: ChartCardProps) => (
  <div className="flex h-121 flex-col gap-10 rounded-[10px] bg-white px-10 pt-[26.5px] pb-6 shadow-card">
    <div className="flex flex-col gap-2.5 leading-tight">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className={`text-h4 ${colorClasses[color]}`}>{title}</p>
        {period}
      </div>
      <p className="text-body-sm text-gray/60">{subtitle}</p>
    </div>
    <div className="min-h-0 flex-1">{children}</div>
  </div>
);

export default ChartCard;
