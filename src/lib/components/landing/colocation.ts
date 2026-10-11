import Cpu from "@lucide/svelte/icons/cpu";
import Globe from "@lucide/svelte/icons/globe";
import PlugZap from "@lucide/svelte/icons/plug-zap";
import ReceiptText from "@lucide/svelte/icons/receipt-text";

export const colocationInquiryUrl =
  "mailto:support@fyrastack.com?subject=Colocation%20inquiry";

export const colocationFeatures = [
  {
    description: "Full out-of-band management over a simple VPN connection",
    icon: Cpu,
    title: "IPMI remote access",
  },
  {
    description: "A+B feeds, UPS, and a generator backup keeps your server on",
    icon: PlugZap,
    title: "Redundant power",
  },
  {
    description: "Providing low-latency access to the entire US on our network",
    icon: Globe,
    title: "Close to your users",
  },
  {
    description: "No hidden power fees, no egress charges, no surprise bills",
    icon: ReceiptText,
    title: "Honest pricing",
  },
];
