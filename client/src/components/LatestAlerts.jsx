import { Link } from 'react-router-dom';

const mockAlerts = [
  { id: 1, time: '10:42:15 UTC', severity: 'Critical', nodeId: 'NX-EDGE-992', message: 'Thermal threshold exceeded (>85°C)' },
  { id: 2, time: '10:38:02 UTC', severity: 'Warning', nodeId: 'NX-SENS-411', message: 'Battery level below 15%' },
  { id: 3, time: '10:15:44 UTC', severity: 'Critical', nodeId: 'NX-GW-004', message: 'Connection lost (Ping timeout)' },
  { id: 4, time: '09:55:12 UTC', severity: 'Warning', nodeId: 'NX-EDGE-128', message: 'High CPU utilization (92%)' },
];

const SEVERITY_STYLES = {
  Critical: 'bg-error-container text-error',
  Warning: 'bg-secondary-container text-secondary',
};

function SeverityBadge({ severity }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${SEVERITY_STYLES[severity]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {severity.toUpperCase()}
    </span>
  );
}

function LatestAlerts() {
  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] tracking-wider text-on-surface-variant uppercase">
          Latest Alerts
        </p>
        <Link to="/alerts" className="font-mono text-[11px] text-primary hover:underline">
          View All →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-on-surface-variant border-b border-outline-variant">
              <th className="pb-2 font-mono text-[11px] font-medium uppercase tracking-wider">Time</th>
              <th className="pb-2 font-mono text-[11px] font-medium uppercase tracking-wider">Severity</th>
              <th className="pb-2 font-mono text-[11px] font-medium uppercase tracking-wider">Node ID</th>
              <th className="pb-2 font-mono text-[11px] font-medium uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody>
            {mockAlerts.map((alert) => (
              <tr key={alert.id} className="border-b border-outline-variant/50 last:border-0">
                <td className="py-3 font-mono text-xs text-on-surface-variant">{alert.time}</td>
                <td className="py-3"><SeverityBadge severity={alert.severity} /></td>
                <td className="py-3 font-mono text-xs text-on-surface">{alert.nodeId}</td>
                <td className="py-3 text-on-surface-variant">{alert.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LatestAlerts;