export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date));
}

export function sanitizeEmail(email?: string): string {
  return email ? email.trim().toLowerCase() : '';
}
