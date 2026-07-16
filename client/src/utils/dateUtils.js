// Centralized date/time formatting.

const IST_TIME_ZONE = 'Asia/Kolkata';

export function formatDateIST(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', {
    timeZone: IST_TIME_ZONE,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTimeIST(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '—';
  const formatted = date.toLocaleString('en-IN', {
    timeZone: IST_TIME_ZONE,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  return `${formatted} IST`;
}

export function formatClockIST(date) {
  return date.toLocaleTimeString('en-GB', {
    timeZone: IST_TIME_ZONE,
    hour12: false,
  });
}