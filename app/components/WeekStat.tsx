type WeekStatProps = {
  label: string;
  value: string;
  unit: string;
  color: "blue" | "orange";
};

const colorClasses = {
  blue: { value: "text-blue", unit: "text-blue-30" },
  orange: { value: "text-orange", unit: "text-orange-30" },
};

// Une paire dt / dd : à placer dans une liste <dl>
const WeekStat = ({ label, value, unit, color }: WeekStatProps) => (
  <div className="flex flex-col gap-4.75 rounded-[10px] bg-white px-7.5 py-5 leading-tight">
    <dt className="text-body text-gray/60">{label}</dt>
    <dd className={`text-h4 ${colorClasses[color].value}`}>
      {value}{" "}
      <span className={`text-body-lg ${colorClasses[color].unit}`}>{unit}</span>
    </dd>
  </div>
);

export default WeekStat;
