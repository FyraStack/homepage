export const siteUrl = "https://fyrastack.com";
export const siteName = "Fyra Stack";

export const socialLinks = {
  bluesky: "https://bsky.app/profile/fyrastack.com",
  discord: "https://discord.gg/YwzKxUBu4U",
  fediverse: "https://fedi.fyralabs.com/@stack",
  github: "https://github.com/FyraStack",
  x: "https://x.com/fyrastack",
};

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
