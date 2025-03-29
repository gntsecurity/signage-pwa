export function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)([smh])$/);
  if (!match) throw new Error('Invalid duration format');

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's': // seconds
      return value * 1000;
    case 'm': // minutes
      return value * 60 * 1000;
    case 'h': // hours
      return value * 60 * 60 * 1000;
    default:
      throw new Error('Unsupported time unit');
  }
}

export function formatDuration(milliseconds: number): string {
  const hours = Math.floor(milliseconds / (60 * 60 * 1000));
  const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);

  return `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m ` : ''}${seconds}s`;
}
