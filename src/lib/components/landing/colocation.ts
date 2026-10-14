import Cpu from "~icons/nucleo/cpu";
import Globe from "~icons/nucleo/globe";
import PlugZap from "~icons/nucleo/plug";
import ReceiptText from "~icons/nucleo/receipt";

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
    description:
      "Racked in Chicago, with low-latency access to the entire US on our network",
    icon: Globe,
    title: "Close to your users",
  },
  {
    description: "No hidden power fees, no egress charges, no surprise bills",
    icon: ReceiptText,
    title: "Honest pricing",
  },
];
