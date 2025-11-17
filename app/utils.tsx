export function timeAgo(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))

    if (seconds < 60) return `${seconds} seconds`;
    if (minutes < 60) return `${minutes} minutes`;
    if (hours < 24) return `${hours} hours`;
    if (days < 7) return `${days} days`;
    if (weeks < 4) return `${weeks} weeks`;
    if (months < 12) return `${months} months`;
    return `${years} years`;
}

export default { timeAgo }