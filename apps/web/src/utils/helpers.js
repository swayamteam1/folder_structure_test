export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDateTime(isoString) {
  if (!isoString) return '-';
  return new Date(isoString).toLocaleString();
}
