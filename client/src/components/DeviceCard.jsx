import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { hasPermission } from '../utils/permissions';

function DeviceCard({ device, role, onEdit, onDelete, page }) {
    const showActions = hasPermission(role, 'canEdit') || hasPermission(role, 'canDelete');

    return (
        <div className="bg-surface-container rounded-xl border border-outline-variant p-4">
            <Link to={`/devices/${device.id}?fromPage=${page}`} className="block">
                <p className="text-base font-semibold text-on-surface mb-2">{device.name}</p>
                <div className="flex items-center gap-3 mb-1">
                    <StatusBadge status={device.status} />
                    <span className="text-on-surface-variant text-sm">{device.location}</span>
                </div>
                <p className="font-mono text-[11px] text-on-surface-variant/70">
                    Last updated: {new Date(device.updatedAt).toLocaleDateString()}
                </p>
            </Link>

            {showActions && (
                <div className="flex gap-4 mt-3 pt-3 border-t border-outline-variant">
                    {hasPermission(role, 'canEdit') && (
                        <button
                            onClick={() => onEdit(device)}
                            className="text-primary text-xs font-medium"
                        >
                            Edit
                        </button>
                    )}
                    {hasPermission(role, 'canDelete') && (
                        <button
                            onClick={() => onDelete(device)}
                            className="text-error text-xs font-medium"
                        >
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default DeviceCard;