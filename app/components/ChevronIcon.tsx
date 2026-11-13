type ChevronIconProps = {
  className?: string;
};

const ChevronIcon = ({ className }: ChevronIconProps) => (
  <svg
    width="6"
    height="9"
    viewBox="0 0 6 9"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M0.5 8.5L4.5 4.5L0.5 0.5"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

export default ChevronIcon;
