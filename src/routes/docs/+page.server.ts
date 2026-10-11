import { createHighlighter } from "shiki";
import { codeThemeName, fyraStackCodeTheme } from "$lib/docs/shiki-theme";
import type { PageServerLoad } from "./$types";

const firstCommands = [
  "ssh root@your_server_ip",
  "dnf upgrade --refresh -y",
  "useradd -m -G wheel stackuser && passwd stackuser",
  "sudoedit /etc/ssh/sshd_config",
];

export const load: PageServerLoad = async () => {
  const highlighter = await createHighlighter({
    langs: ["bash"],
    themes: [fyraStackCodeTheme],
  });
  const firstCommandsHtml = highlighter
    .codeToHtml(firstCommands.join("\n"), {
      lang: "bash",
      theme: codeThemeName,
    })
    .replace(' tabindex="0"', "");
  highlighter.dispose();
  return { firstCommandsHtml };
};
