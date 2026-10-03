declare module "*.md" {
  import type { Component } from "svelte";

  const component: Component;
  export default component;
  export const metadata: {
    title: string;
    description: string;
    updated: string;
  };
}
