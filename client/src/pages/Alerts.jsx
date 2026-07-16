import { useAuth } from '../context/AuthContext';
import AppShell from '../components/layout/AppShell';
import PageHeader from '../components/layout/PageHeader';

// MOCK DATA 

const mockAlerts = [
  { id: 1, time: '10:42:15 IST', severity: 'Critical', nodeId: 'NX-EDGE-992', message: 'Thermal threshold exceeded (>85°C)' },
  { id: 2, time: '10:38:02 IST', severity: 'Warning', nodeId: 'NX-SENS-411', message: 'Battery level below 15%' },
  { id: 3, time: '10:15:44 IST', severity: 'Critical', nodeId: 'NX-GW-004', message: 'Connection lost (Ping timeout)' },
  { id: 4, time: '09:55:12 IST', severity: 'Warning', nodeId: 'NX-EDGE-128', message: 'High CPU utilization (92%)' },
  { id: 5, time: '09:40:31 IST', severity: 'Warning', nodeId: 'NX-SENS-203', message: 'Signal strength degraded' },
  { id: 6, time: '09:12:08 IST', severity: 'Critical', nodeId: 'NX-GW-011', message: 'Firmware verification failed' },
];

const SEVERITY_STYLES = {
  Critical: 'bg-error-container/20 text-error',
  Warning: 'bg-primary-container/10 text-secondary',
};

function SeverityBadge({ severity }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${SEVERITY_STYLES[severity]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {severity.toUpperCase()}
    </span>
  );
}

function Alerts() {
  const { user } = useAuth();

  return (
    <AppShell role={user?.role}>
      <PageHeader breadcrumb="System > Alerts" title="Alerts" />

      <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-on-surface-variant border-b border-outline-variant">
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Time</th>
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Severity</th>
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Node ID</th>
              <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody>
            {mockAlerts.map((alert) => (
              <tr key={alert.id} className="border-b border-outline-variant/50 last:border-0 hover:bg-surface-container-high/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-on-surface-variant">{alert.time}</td>
                <td className="px-4 py-3"><SeverityBadge severity={alert.severity} /></td>
                <td className="px-4 py-3 font-mono text-xs text-on-surface">{alert.nodeId}</td>
                <td className="px-4 py-3 text-on-surface-variant">{alert.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

export default Alerts;