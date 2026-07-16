import { useState } from 'react';
import Button from './Button';

const DEVICE_TYPES = [
  'Device Types',
  'Temperature Sensor',
  'Air Quality Sensor',
  'Motion Sensor',
  'Humidity Sensor',
  'Security Camera',
  'Smart Lock',
  'Smart Thermostat',
  'Energy Meter',
];

function DeviceForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || DEVICE_TYPES[0],
    status: initialData?.status || 'Online',
    location: initialData?.location || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(data) {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = 'Device name is required';
    if (!data.type) newErrors.type = 'Device type is required';
    if (!data.status) newErrors.status = 'Status is required';
    if (!data.location.trim()) newErrors.location = 'Location is required';
    return newErrors;
  }

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = {
      ...formData,
      name: formData.name.trim(),
      location: formData.location.trim(),
    };
    const validationErrors = validate(trimmed);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(trimmed);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setFormData({
      name: '',
      type: DEVICE_TYPES[0],
      status: 'Online',
      location: '',
    });
    setErrors({});
  }

  const inputClass =
    'w-full rounded-md bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container placeholder:text-on-surface-variant/50';

  const labelClass =
    'block font-mono text-[11px] tracking-wider uppercase text-on-surface-variant mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className={labelClass}>
          Device Name <span className="text-error">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="e.g. Lobby Motion Sensor"
          className={inputClass}
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="type" className={labelClass}>
          Device Type <span className="text-error">*</span>
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => updateField('type', e.target.value)}
          className={inputClass}
          disabled={isSubmitting}
        >
          {DEVICE_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.type && <p className="text-error text-xs mt-1">{errors.type}</p>}
      </div>

      <div>
        <label htmlFor="status" className={labelClass}>
          Status <span className="text-error">*</span>
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => updateField('status', e.target.value)}
          className={inputClass}
          disabled={isSubmitting}
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
        {errors.status && <p className="text-error text-xs mt-1">{errors.status}</p>}
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>
          Location <span className="text-error">*</span>
        </label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => updateField('location', e.target.value)}
          placeholder="e.g. 2nd Floor - East Wing"
          className={inputClass}
          disabled={isSubmitting}
        />
        {errors.location && <p className="text-error text-xs mt-1">{errors.location}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : initialData ? 'Save Changes' : 'Add Device'}
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset} disabled={isSubmitting}>
          Reset
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default DeviceForm;