import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const COUNTER_FILE = join(process.cwd(), 'prereserve-counter.json');

interface CounterData {
	count: number;
	totalMonthly: number;
}

function read(): CounterData {
	if (!existsSync(COUNTER_FILE)) return { count: 0, totalMonthly: 0 };
	try {
		const data = JSON.parse(readFileSync(COUNTER_FILE, 'utf-8'));
		return {
			count:        typeof data.count        === 'number' ? data.count        : 0,
			totalMonthly: typeof data.totalMonthly === 'number' ? data.totalMonthly : 0,
		};
	} catch {
		return { count: 0, totalMonthly: 0 };
	}
}

function write(data: CounterData): void {
	writeFileSync(COUNTER_FILE, JSON.stringify(data), 'utf-8');
}

export function recordSubmission(pricePerMonth: number): { submissionNumber: number; totalMonthly: number } {
	const current = read();
	const next: CounterData = {
		count:        current.count + 1,
		totalMonthly: current.totalMonthly + pricePerMonth,
	};
	write(next);
	return { submissionNumber: next.count, totalMonthly: next.totalMonthly };
}
