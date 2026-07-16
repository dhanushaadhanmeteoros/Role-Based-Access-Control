import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useDevices } from '../hooks/useDevices';
import AppShell from '../components/layout/AppShell';
import DeviceTable from '../components/DeviceTable';
import DeviceControls from '../components/DeviceControls';
import Modal from '../components/Modal';
import DeviceForm from '../components/DeviceForm';
import ConfirmDialog from '../components/ConfirmDialog';
import Pagination from '../components/Pagination';
import PageHeader from '../components/layout/PageHeader';

const PAGE_SIZE = 10;

function Devices() {
    const { user } = useAuth();
    const { showToast } = useToast();
    const { devices, loading, error: fetchError, addDevice, updateDevice, deleteDevice } = useDevices();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [sortBy, setSortBy] = useState('id');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDevice, setEditingDevice] = useState(null);
    const [deletingDevice, setDeletingDevice] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;

    function setPage(newPage) {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set('page', String(newPage));
            return params;
        });
    }

    function resetToFirstPage() {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.set('page', '1');
            return params;
        });
    }

    async function handleAddDevice(formData) {
        try {
            await addDevice(formData);
            setIsModalOpen(false);
            showToast(`"${formData.name}" was added successfully.`, 'success');
        } catch (err) {
            showToast(err.response?.data?.message || 'Unable to add device. Please try again.', 'error');
        }
    }

    async function handleEditDevice(formData) {
        try {
            await updateDevice(editingDevice.id, formData);
            setEditingDevice(null);
            showToast(`"${formData.name}" was updated successfully.`, 'success');
        } catch (err) {
            showToast(err.response?.data?.message || 'Unable to update device. Please try again.', 'error');
        }
    }

    async function handleConfirmDelete() {
        try {
            await deleteDevice(deletingDevice.id);
            showToast(`"${deletingDevice.name}" was deleted.`, 'success');
            setDeletingDevice(null);
        } catch (err) {
            showToast(err.response?.data?.message || 'Unable to delete device. Please try again.', 'error');
            setDeletingDevice(null);
        }
    }

    const deviceTypes = useMemo(() => [...new Set(devices.map((d) => d.type))], [devices]);

    const filteredDevices = useMemo(() => {
        let result = devices;
        if (search.trim()) {
            const query = search.trim().toLowerCase();
            result = result.filter(
                (d) =>
                    d.id.toLowerCase().includes(query) ||
                    d.name.toLowerCase().includes(query) ||
                    d.type.toLowerCase().includes(query) ||
                    d.location.toLowerCase().includes(query)
            );
        }
        if (statusFilter !== 'All') result = result.filter((d) => d.status === statusFilter);
        if (typeFilter !== 'All') result = result.filter((d) => d.type === typeFilter);
        return [...result].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }, [devices, search, statusFilter, typeFilter, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredDevices.length / PAGE_SIZE));
    const paginatedDevices = useMemo(
        () => filteredDevices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [filteredDevices, page]
    );

    return (
        <AppShell onAddDevice={() => setIsModalOpen(true)} role={user?.role}>
            <PageHeader breadcrumb="Infrastructure > Devices" title="Device Management" />

            {fetchError && (
                <div className="bg-error-container text-error text-sm rounded-md px-4 py-2 mb-4">
                    {fetchError}
                </div>
            )}

            {loading ? (
                <p className="text-on-surface-variant text-sm">Loading devices…</p>
            ) : (
                <>
                    <DeviceControls
                        search={search}
                        onSearchChange={(value) => { setSearch(value); resetToFirstPage(); }}
                        statusFilter={statusFilter}
                        onStatusFilterChange={(value) => { setStatusFilter(value); resetToFirstPage(); }}
                        typeFilter={typeFilter}
                        onTypeFilterChange={(value) => { setTypeFilter(value); resetToFirstPage(); }}
                        deviceTypes={deviceTypes}
                        sortBy={sortBy}
                        onSortByChange={(value) => { setSortBy(value); resetToFirstPage(); }}
                    />
                    <DeviceTable
                        devices={paginatedDevices}
                        role={user?.role}
                        onEdit={setEditingDevice}
                        onDelete={setDeletingDevice}
                        onAddFirst={() => setIsModalOpen(true)}
                        page={page}
                    />
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}

            {isModalOpen && (
                <Modal title="Add Device" onClose={() => setIsModalOpen(false)}>
                    <DeviceForm onSubmit={handleAddDevice} onCancel={() => setIsModalOpen(false)} />
                </Modal>
            )}
            {editingDevice && (
                <Modal title="Edit Device" onClose={() => setEditingDevice(null)}>
                    <DeviceForm
                        initialData={editingDevice}
                        onSubmit={handleEditDevice}
                        onCancel={() => setEditingDevice(null)}
                    />
                </Modal>
            )}
            {deletingDevice && (
                <ConfirmDialog
                    title="Delete Device?"
                    message={`This action is permanent. Deleting "${deletingDevice.name}" will remove it from the network and erase its history.`}
                    confirmValue={deletingDevice.name}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setDeletingDevice(null)}
                />
            )}
        </AppShell>
    );
}

export default Devices;