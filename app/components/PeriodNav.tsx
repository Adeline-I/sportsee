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
  isDisabled: boolean;
  onClick: () => void;
  children: ReactNode;
};

const arrowClass =
  "flex size-6 cursor-pointer items-center justify-center rounded-[10px] border border-gray/60 bg-white text-gray hover:border-blue hover:bg-blue-70 hover:text-white focus-visible:border-blue focus-visible:bg-blue-70 focus-visible:text-white aria-disabled:cursor-default aria-disabled:border-gray/60 aria-disabled:bg-gray-10 aria-disabled:text-gray/60";

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
    className={arrowClass}
  >
    {children}
  </button>
);

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
