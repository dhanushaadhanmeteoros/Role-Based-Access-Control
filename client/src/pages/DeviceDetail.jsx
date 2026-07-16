import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDevices } from '../hooks/useDevices';
import AppShell from '../components/layout/AppShell';
import PageHeader from '../components/layout/PageHeader';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import { formatDateTimeIST } from '../utils/dateUtils';

function DeviceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { devices } = useDevices();
    const [searchParams] = useSearchParams();
    const fromPage = searchParams.get('fromPage') || '1';
    const device = devices.find((d) => d.id === id);

    if (!device) {
        return (
            <AppShell role={user?.role}>
                <p className="text-on-surface-variant">Device "{id}" not found.</p>
                <Button className="mt-4" onClick={() => navigate('/devices')}>
                    Back to Devices
                </Button>
            </AppShell>
        );
    }

    return (
        <AppShell role={user?.role}>
            <PageHeader
                breadcrumb={`Infrastructure > Devices > ${device.id}`}
                title={device.name}
                trailing={<StatusBadge status={device.status} />}
            />

            <div className="bg-surface-container rounded-xl border border-outline-variant p-6 max-w-xl">
                <dl className="grid grid-cols-2 gap-y-4 text-sm">
                    <dt className="text-on-surface-variant">Device ID</dt>
                    <dd className="font-mono text-on-surface">{device.id}</dd>

                    <dt className="text-on-surface-variant">Type</dt>
                    <dd className="text-on-surface">{device.type}</dd>

                    <dt className="text-on-surface-variant">Location</dt>
                    <dd className="text-on-surface">{device.location}</dd>

                    <dt className="text-on-surface-variant">Created</dt>
                    <dd className="text-on-surface">{formatDateTimeIST(device.createdAt)}</dd>

                    <dt className="text-on-surface-variant">Last Updated</dt>
                    <dd className="text-on-surface">{formatDateTimeIST(device.updatedAt)}</dd>
                </dl>
            </div>

            <Button className="mt-6" variant="secondary" onClick={() => navigate(`/devices?page=${fromPage}`)}>
                ← Back to Devices
            </Button>
        </AppShell>
    );
}

export default DeviceDetail;