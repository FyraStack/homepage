/// <reference types="unplugin-icons/types/svelte" />
// See https://svelte.dev/docs/kit/types#app.d.ts[]
// for information about these interfaces
//

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
