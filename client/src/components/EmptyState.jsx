function EmptyState({ onAddFirst }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-6 opacity-70">
                <circle cx="60" cy="60" r="14" stroke="#C9BFAF" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="5" fill="#C9BFAF" />
                <line x1="60" y1="30" x2="60" y2="46" stroke="#C9BFAF" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="60" cy="24" r="4" stroke="#C9BFAF" strokeWidth="1.5" />
                <line x1="34" y1="60" x2="46" y2="60" stroke="#C9BFAF" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="26" cy="60" r="4" stroke="#C9BFAF" strokeWidth="1.5" />
                <line x1="86" y1="60" x2="74" y2="60" stroke="#C9BFAF" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="94" cy="60" r="4" stroke="#C9BFAF" strokeWidth="1.5" />
            </svg>
            <h3 className="text-lg font-serif font-semibold text-on-surface mb-1">No devices found</h3>
            <p className="text-on-surface-variant text-sm max-w-xs mb-6">
                You haven't registered any devices to this network yet. Connect your first gateway to
                start monitoring telemetry data.
            </p>
            {onAddFirst && (
                <button
                    onClick={onAddFirst}
                    className="flex items-center gap-2 bg-primary-container hover:bg-primary-container/90 text-on-primary-container font-medium text-sm px-4 py-2 rounded-md transition-colors"
                >
                    + Add First Device
                </button>
            )}
        </div>
    );
}

export default EmptyState;