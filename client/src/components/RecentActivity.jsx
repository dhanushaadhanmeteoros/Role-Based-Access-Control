// MOCK DATA — there's no activity/event-log system in this project yet.
// This is static placeholder content matching the UI design, not real system events.
// Replace with a real activity feed once an events API/data model exists.
const mockActivity = [
  { id: 1, title: 'Firmware Update Complete', description: 'NX-GW-001 (v2.4.1)', time: '2 mins ago', color: '#6B8F5A' },
  { id: 2, title: 'New Node Joined', description: 'NX-SENS-889 registered to Zone A', time: '15 mins ago', color: '#6B8F5A' },
  { id: 3, title: 'Authentication Success', description: 'Admin user (192.168.1.45)', time: '1 hour ago', color: '#B0A08A' },
  { id: 4, title: 'Configuration Backup', description: 'Automated system backup completed', time: '3 hours ago', color: '#B0A08A' },
];

function RecentActivity() {
  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant p-5 flex-1 flex flex-col">
      <p className="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase mb-4">
        Recent Activity
      </p>

      <ul className="space-y-4">
        {mockActivity.map((entry) => (
          <li key={entry.id} className="flex gap-3">
            <span
              className="mt-1.5 w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <div>
              <p className="text-sm font-medium text-on-surface">{entry.title}</p>
              <p className="text-sm text-on-surface-variant">{entry.description}</p>
              <p className="font-mono text-[11px] text-on-surface-variant/70 mt-0.5">
                {entry.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;