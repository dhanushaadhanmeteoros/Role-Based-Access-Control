import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useDevices } from '../hooks/useDevices';
import AppShell from '../components/layout/AppShell';
import RoleBadge from '../components/RoleBadge';
import StatCard from '../components/StatCard.jsx';
import DeviceTypesChart from '../components/DeviceTypesChart';
import ThroughputChart from '../components/ThroughputChart';
import RecentActivity from '../components/RecentActivity';
import LatestAlerts from '../components/LatestAlerts';
import Modal from '../components/Modal';
import DeviceForm from '../components/DeviceForm';

function Dashboard() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const { devices, loading, error: fetchError, addDevice } = useDevices();

    const [isModalOpen, setIsModalOpen] = useState(false);

    async function handleAddDevice(formData) {
        try {
            await addDevice(formData);
            setIsModalOpen(false);
            showToast(`"${formData.name}" was added successfully.`, 'success');
        } catch (err) {
            showToast(err.response?.data?.message || 'Unable to add device. Please try again.', 'error');
        }
    }

    const totalDevices = devices.length;
    const onlineDevices = devices.filter((d) => d.status === 'Online').length;
    const offlineDevices = devices.filter((d) => d.status === 'Offline').length;

    return (
        <AppShell onAddDevice={() => setIsModalOpen(true)} role={user?.role}>
            <div className="flex items-center justify-between mb-1">
                <p className="font-mono text-xs tracking-wider text-on-surface-variant uppercase">
                    System &gt; Overview
                </p>
                <RoleBadge role={user?.role} email={user?.username} />
            </div>
            <h1 className="text-[32px] leading-10 font-serif font-semibold tracking-tight text-on-surface mb-6">
                Dashboard
            </h1>

            {fetchError && (
                <div className="bg-error-container text-error text-sm rounded-md px-4 py-2 mb-4">
                    {fetchError}
                </div>
            )}

            {loading ? (
                <p className="text-on-surface-variant text-sm">Loading devices…</p>
            ) : (
                <>
                    <div className="flex flex-wrap gap-4">
                        <StatCard label="Total Devices" value={totalDevices} accentColor="text-on-surface" />
                        <StatCard label="Online" value={onlineDevices} accentColor="text-tertiary" />
                        <StatCard label="Offline" value={offlineDevices} accentColor="text-on-surface-variant" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8 items-stretch">
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <ThroughputChart />
                            <LatestAlerts />
                        </div>
                        <div className="flex flex-col gap-4">
                            <DeviceTypesChart devices={devices} />
                            <RecentActivity />
                        </div>
                    </div>

                </>
            )}

            {isModalOpen && (
                <Modal title="Add Device" onClose={() => setIsModalOpen(false)}>
                    <DeviceForm onSubmit={handleAddDevice} onCancel={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </AppShell>
    );
}

export default Dashboard;