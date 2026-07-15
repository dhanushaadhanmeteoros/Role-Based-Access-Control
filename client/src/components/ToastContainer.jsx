import { useToast } from '../context/ToastContext';

const typeStyles = {
    success: 'bg-tertiary-container text-on-tertiary-container border-tertiary/30',
    error: 'bg-error-container text-error border-error/30',
};

function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-100 flex flex-col gap-2 w-full max-w-sm px-4 md:px-0">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    role="status"
                    className={`flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm shadow-lg ${typeStyles[toast.type] || typeStyles.success}`}
                >
                    <span>{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="opacity-70 hover:opacity-100 transition-opacity shrink-0"
                        aria-label="Dismiss notification"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}

export default ToastContainer;