// client/src/components/StatCard.jsx
function StatCard({ label, value, accentColor }) {
  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant p-5 flex-1 min-w-40">
      <p className="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase mb-3">
        {label}
      </p>
      <p className={`text-3xl font-bold ${accentColor}`}>{value}</p>
    </div>
  );
}

export default StatCard;