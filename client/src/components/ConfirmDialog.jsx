import { useState } from 'react';
import Button from './Button';

function normalize(str) {
  return (str || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function ConfirmDialog({ title, message, confirmValue, onConfirm, onCancel }) {
  const [typedValue, setTypedValue] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const isMatch = normalize(typedValue) === normalize(confirmValue);

  async function handleConfirm() {
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-surface-container-high rounded-xl border border-outline-variant shadow-xl w-full max-w-sm p-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-error-container text-error shrink-0">
            ⚠
          </span>
          <div>
            <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
            <p className="text-on-surface-variant text-sm mt-1">{message}</p>
          </div>
        </div>

        {confirmValue && (
          <div className="mb-4">
            <label htmlFor="confirm-delete-input" className="block font-mono text-[11px] tracking-wider uppercase text-on-surface-variant mb-1">
              Type "{confirmValue}" to confirm
            </label>
            <input
              id="confirm-delete-input"
              name="confirm-delete-input"
              type="text"
              value={typedValue}
              onChange={(e) => setTypedValue(e.target.value)}
              autoComplete="off"
              disabled={isConfirming}
              className="w-full rounded-md bg-surface-container border border-outline-variant text-on-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-error/40 focus:border-error"
            />
            {typedValue.length > 0 && !isMatch && (
              <p className="text-on-surface-variant text-xs mt-1">Doesn't match yet.</p>
            )}
          </div>
        )}
        <div className="flex gap-3">
          <Button
            variant="danger"
            onClick={handleConfirm}
            disabled={(confirmValue ? !isMatch : false) || isConfirming}
            className="flex-1"
          >
            {isConfirming ? 'Deleting…' : 'Delete Permanently'}
          </Button>
          <Button variant="secondary" onClick={onCancel} disabled={isConfirming} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;