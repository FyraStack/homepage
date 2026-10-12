import { highlightToHtml } from "$lib/docs/highlight";
import type { PageServerLoad } from "./$types";

const firstCommands = [
  "ssh root@your_server_ip",
  "dnf upgrade --refresh -y",
  "useradd -m -G wheel stackuser && passwd stackuser",
  "sudoedit /etc/ssh/sshd_config",
];

export const load: PageServerLoad = async () => ({
  firstCommandsHtml: await highlightToHtml(firstCommands.join("\n"), "bash"),
});
