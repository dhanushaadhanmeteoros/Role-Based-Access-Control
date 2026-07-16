import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';
import DeviceCard from './DeviceCard';
import { hasPermission } from '../utils/permissions';

function DeviceTable({ devices, role, onEdit, onDelete, onAddFirst, page }) {
  const navigate = useNavigate();
  const showActions = hasPermission(role, 'canEdit') || hasPermission(role, 'canDelete');

  if (devices.length === 0) {
    return (
      <div className="bg-surface-container rounded-xl border border-outline-variant">
        <EmptyState onAddFirst={onAddFirst} />
      </div>
    );
  }

  return (
    <>
      {/* Mobile — card list, matches mobile-view.png */}
      <div className="md:hidden space-y-3">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            role={role}
            onEdit={onEdit}
            onDelete={onDelete}
            page={page}
          />
        ))}
      </div>

      {/* Desktop/tablet — dense table, matches device.png */}
      <div className="hidden md:block bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant text-on-surface-variant">
                <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Device ID</th>
                <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Updated</th>
                {showActions && <th className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr
                  key={device.id}
                  onClick={() => navigate(`/devices/${device.id}?fromPage=${page}`)}
                  className="h-10 border-b border-outline-variant/50 last:border-0 hover:bg-surface-container-high/50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-mono text-on-surface-variant">
                    <Link
                      to={`/devices/${device.id}?fromPage=${page}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary hover:underline"
                    >
                      {device.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-on-surface">{device.name}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{device.type}</td>
                  <td className="px-4 py-3"><StatusBadge status={device.status} /></td>
                  <td className="px-4 py-3 text-on-surface-variant">{device.location}</td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {new Date(device.updatedAt).toLocaleDateString()}
                  </td>
                  {showActions && (
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        {hasPermission(role, 'canEdit') && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onEdit(device); }}
                            className="text-primary hover:underline text-xs font-medium"
                          >
                            Edit
                          </button>
                        )}
                        {hasPermission(role, 'canDelete') && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onDelete(device); }}
                            className="text-error hover:underline text-xs font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DeviceTable;