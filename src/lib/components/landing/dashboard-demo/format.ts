export function formatBytes(bytes: number): string {
	if (!bytes) return '0B';
	const gb = bytes / (1024 * 1024 * 1024);
	if (gb >= 1) return `${gb.toFixed(0)}GB`;
	const mb = bytes / (1024 * 1024);
	return `${mb.toFixed(0)}MB`;
}

export function getErrorMessage(err: unknown, fallback: string): string {
	if (err instanceof Error) return err.message;
	return fallback;
}
