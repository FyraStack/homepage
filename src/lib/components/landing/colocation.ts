import Cpu from '@lucide/svelte/icons/cpu';
import Globe from '@lucide/svelte/icons/globe';
import PlugZap from '@lucide/svelte/icons/plug-zap';
import ReceiptText from '@lucide/svelte/icons/receipt-text';

export const colocationInquiryUrl = 'mailto:support@fyrastack.com?subject=Colocation%20inquiry';

export const colocationFeatures = [
	{
		icon: Cpu,
		title: 'IPMI remote access',
		description: 'Full out-of-band management over a simple VPN connection'
	},
	{
		icon: PlugZap,
		title: 'Redundant power',
		description: 'A+B feeds, UPS, and a generator backup keeps your server on'
	},
	{
		icon: Globe,
		title: 'Midwest proud',
		description: 'Providing low-latency access to the entire US on our network'
	},
	{
		icon: ReceiptText,
		title: 'Honest pricing',
		description: 'No hidden power fees, no egress charges, no surprise bills'
	}
];

export const colocationSteps = [
	{
		title: "Tell us what you're racking",
		description: 'Send us your plan, hardware details, and power needs.'
	},
	{
		title: 'Ship it to Chicago',
		description: "We'll confirm availability and share shipping instructions."
	},
	{
		title: 'We rack it',
		description: "We'll send an invoice once your server is racked."
	}
];
