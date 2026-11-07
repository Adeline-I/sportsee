type StatCardProps = {
  label: string;
  value: string;
  unit: string;
};

// Une paire dt / dd : à placer dans une liste <dl>
const StatCard = ({ label, value, unit }: StatCardProps) => (
  <div className="flex flex-col gap-4.75 rounded-[10px] bg-blue px-7.5 py-5 text-white">
    <dt className="text-body">{label}</dt>
    <dd className="text-h4">
      {value} <span className="text-body-lg text-blue-30">{unit}</span>
    </dd>
  </div>
);

export default StatCard;
