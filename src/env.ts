import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  DISCORD_CONTACT_WEBHOOK_URL: { schema: (input) => input ?? "" },
});
