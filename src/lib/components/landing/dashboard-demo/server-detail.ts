import ArrowUpDown from '~icons/lucide/arrow-up-down';
import Activity from '~icons/nucleo/activity';
import Globe from '~icons/nucleo/globe';
import Settings from '~icons/nucleo/settings';
import type { Component } from 'svelte';
import type { DemoState, ServerTab } from './demo-state.svelte';

export const serverTabs: {
	id: ServerTab;
	label: string;
	icon: Component<{ class?: string }>;
	featureFlag?: keyof DemoState['featureFlags'];
}[] = [
	{ id: 'overview', label: 'Overview', icon: Activity },
	{ id: 'networking', label: 'Networking', icon: Globe, featureFlag: 'vpsNetworking' },
	{ id: 'resize', label: 'Resize', icon: ArrowUpDown, featureFlag: 'vpsResize' },
	{ id: 'settings', label: 'Settings', icon: Settings, featureFlag: 'vpsSettings' }
];
