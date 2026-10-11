/// <reference types="unplugin-icons/types/svelte" />

declare global {
  namespace App {
    interface Platform {
      cf: CfProperties;
      ctx: ExecutionContext;
      env: Env;
    }
  }
}

export {};
