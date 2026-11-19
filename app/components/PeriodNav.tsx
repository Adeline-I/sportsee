import type { ReactNode } from "react";
import ChevronIcon from "~/components/ChevronIcon";

type PeriodNavProps = {
  label: string;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

type ArrowButtonProps = {
  label: string;
  /** aria-disabled plutôt que disabled : le bouton garde le focus quand on atteint une limite */
  isDisabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

const ARROW_CLASS =
  "flex size-6 cursor-pointer items-center justify-center rounded-[10px] border border-gray/60 bg-white text-gray transition-colors duration-300 ease-in hover:border-blue hover:bg-blue-70 hover:text-white focus-visible:border-blue focus-visible:bg-blue-70 focus-visible:text-white aria-disabled:cursor-default aria-disabled:border-gray/60 aria-disabled:bg-gray-10 aria-disabled:text-gray/60 motion-reduce:transition-none";

const ArrowButton = ({
  label,
  isDisabled,
  onClick,
  children,
}: ArrowButtonProps) => (
  <button
    type="button"
    aria-label={label}
    aria-disabled={isDisabled}
    onClick={onClick}
    className={ARROW_CLASS}
  >
    {children}
  </button>
);

/** Période affichée, entre les flèches semaine précédente / suivante */
const PeriodNav = ({
  label,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: PeriodNavProps) => (
  <div className="flex items-center gap-1.5">
    <ArrowButton
      label="Semaine précédente"
      isDisabled={!hasPrevious}
      onClick={onPrevious}
    >
      <ChevronIcon className="rotate-180" />
    </ArrowButton>
    <p aria-live="polite" className="text-body-sm">
      {label}
    </p>
    <ArrowButton
      label="Semaine suivante"
      isDisabled={!hasNext}
      onClick={onNext}
    >
      <ChevronIcon />
    </ArrowButton>
  </div>
);

export default PeriodNav;
