import type { ReactNode } from "react";
import ErrorMessage from "~/components/ErrorMessage";
import Loader from "~/components/Loader";

type ChartCardProps = {
  title: string;
  color: "blue" | "orange";
  subtitle: string;
  period: ReactNode;
  isLoading: boolean;
  error?: Error;
  children?: ReactNode;
};

const COLOR_CLASSES = {
  blue: "text-blue",
  orange: "text-orange",
};

/** Grisé si le rechargement est lent */
const RELOADING_CLASS =
  "opacity-50 transition-opacity delay-200 duration-200 ease-linear motion-reduce:transition-none";

/** Carte d'un graphique : titre, période, puis le graphique, le chargement ou l'erreur */
const ChartCard = ({
  title,
  color,
  subtitle,
  period,
  isLoading,
  error,
  children,
}: ChartCardProps) => {
  // Rechargement : un graphique est déjà affiché, il reste visible mais grisé
  const isReloading = isLoading && children !== undefined;
  const reloadingClass = isReloading ? RELOADING_CLASS : "";

  return (
    <div className="flex h-121 flex-col gap-10 rounded-[10px] bg-white px-10 pt-[26.5px] pb-6 shadow-card">
      <div className="flex flex-col gap-2.5 leading-tight">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className={`text-h4 ${COLOR_CLASSES[color]} ${reloadingClass}`}>
            {title}
          </p>
          {period}
        </div>
        <p className="text-body-sm text-gray/60">{subtitle}</p>
      </div>
      <div aria-busy={isLoading} className={`min-h-0 flex-1 ${reloadingClass}`}>
        {error ? (
          <ErrorMessage message={error.message} />
        ) : (
          (children ?? <Loader />)
        )}
      </div>
    </div>
  );
};

export default ChartCard;
