import { invalid } from "@sveltejs/kit";
import { type } from "arktype";
import {
  type ContactTopic,
  contactLimits,
  contactTopics,
} from "#lib/contact.js";
import { DISCORD_CONTACT_WEBHOOK_URL } from "$app/env/private";

const accentColor = 0xc6_71_6d;

const trimmed = type.string.pipe((value) => value.trim());

function requiredText(maxLength: number, message: string) {
  return trimmed.to(
    type.string
      .atLeastLength(1)
      .atMostLength(maxLength)
      .configure({ message }, "references")
  );
}

function optionalText(maxLength: number, message: string) {
  return trimmed.to(
    type.string.atMostLength(maxLength).configure({ message }, "references")
  );
}

const sender = {
  "company_website?": "string",
  email: trimmed.to(
    type("string.email")
      .atMostLength(contactLimits.email)
      .configure(
        { message: "Please enter a valid email address." },
        "references"
      )
  ),
  name: requiredText(contactLimits.name, "Please enter your name."),
} as const;

export const contactMessageSchema = type({
  ...sender,
  message: requiredText(
    contactLimits.message,
    `Please enter a message under ${contactLimits.message} characters.`
  ),
  topic: type
    .enumerated(...contactTopics)
    .configure({ message: "Please choose a topic." }, "references"),
});

export const colocationInquirySchema = type({
  ...sender,
  hardware: requiredText(
    contactLimits.inquiryField,
    "Please describe the hardware you want to rack."
  ),
  "notes?": optionalText(
    contactLimits.inquiryField,
    `Please keep your notes under ${contactLimits.inquiryField} characters.`
  ),
  space: requiredText(contactLimits.inquirySpace, "Please choose rack space."),
});

export interface ContactMessage {
  email: string;
  message: string;
  name: string;
  topic: ContactTopic;
}

function toDiscordPayload(contact: ContactMessage) {
  return {
    allowed_mentions: { parse: [] },
    embeds: [
      {
        color: accentColor,
        description: contact.message,
        fields: [
          { inline: true, name: "Name", value: contact.name },
          { inline: true, name: "Email", value: contact.email },
          { inline: true, name: "Topic", value: contact.topic },
        ],
        timestamp: new Date().toISOString(),
        title: `${contact.topic} from ${contact.name}`,
      },
    ],
    username: "fyrastack.com contact form",
  };
}

export async function forwardToDiscord(contact: ContactMessage) {
  const webhookUrl = DISCORD_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    invalid("The contact form isn't available right now.");
  }

  const response = await fetch(webhookUrl, {
    body: JSON.stringify(toDiscordPayload(contact)),
    headers: { "content-type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    console.error(
      "Discord webhook rejected contact message",
      response.status,
      await response.text()
    );
    invalid("We couldn't send your message. Please try again.");
  }
}
