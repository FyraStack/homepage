import { resolve } from "$app/paths";

export const contactTopics = [
  "General question",
  "Sales",
  "Colocation",
  "Partnerships and sponsorships",
  "Press",
] as const;

export type ContactTopic = (typeof contactTopics)[number];

export const contactLimits = {
  email: 254,
  message: 4000,
  name: 100,
};

export const contactHoneypotField = "company_website";

export type ContactStatus =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; message: string };

const sendFailedMessage = "We couldn't send your message. Please try again.";
const unreachableMessage =
  "We couldn't reach the server. Check your connection and try again.";

async function readErrorMessage(response: Response) {
  try {
    const body: { message?: string } = await response.json();
    return body.message ?? sendFailedMessage;
  } catch {
    return sendFailedMessage;
  }
}

export async function submitContactMessage(
  body: FormData
): Promise<ContactStatus> {
  try {
    const response = await fetch(resolve("/api/contact"), {
      body,
      method: "POST",
    });
    return response.ok
      ? { kind: "sent" }
      : { kind: "failed", message: await readErrorMessage(response) };
  } catch {
    return { kind: "failed", message: unreachableMessage };
  }
}
