import { form } from '$app/server';
import { type } from 'arktype';
import { submitPrereserve, type PrereserveResult, validPlanNames } from '$lib/server/prereserve';

const planType = type.enumerated(...[...validPlanNames].sort());

const prereserveSchema = type({
	plan: planType,
	name: 'string.trim & /\\S/',
	email: 'string.trim & string.email',
	company: 'string.trim',
	currentProvider: 'string.trim',
	useCase: 'string.trim'
});

export const prereserve = form(prereserveSchema, async (data): Promise<PrereserveResult> =>
	submitPrereserve(data)
);
