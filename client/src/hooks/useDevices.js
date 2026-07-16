import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export function useDevices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/devices');
      setDevices(res.data);
    } catch {
      setError('Unable to load devices. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  async function addDevice(deviceData) {
    const res = await api.post('/devices', deviceData);
    await fetchDevices();
    return res.data;
  }

  async function updateDevice(id, deviceData) {
    const res = await api.put(`/devices/${id}`, deviceData);
    setDevices((prev) => prev.map((d) => (d.id === id ? res.data : d)));
    return res.data;
  }

  async function deleteDevice(id) {
    await api.delete(`/devices/${id}`);
    await fetchDevices();
  }

  return { devices, loading, error, addDevice, updateDevice, deleteDevice, refetch: fetchDevices };
}