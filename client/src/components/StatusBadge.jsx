function StatusBadge({ status }) {
  const isOnline = status === 'Online';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isOnline
          ? 'bg-tertiary-container text-tertiary'
          : 'bg-error-container text-error'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isOnline ? 'bg-tertiary' : 'bg-error'
        }`}
      />
      {status}
    </span>
  );
}

export default StatusBadge;