import { error, json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import {
  type ContactTopic,
  contactHoneypotField,
  contactLimits,
  contactTopics,
} from "$lib/contact";
import type { RequestHandler } from "./$types";

export const prerender = false;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const accentColor = 0xc6_71_6d;

interface ContactMessage {
  email: string;
  message: string;
  name: string;
  topic: ContactTopic;
}

function readField(form: FormData, field: string) {
  const value = form.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function isContactTopic(topic: string): topic is ContactTopic {
  return (contactTopics as readonly string[]).includes(topic);
}

function parseContactMessage(form: FormData): ContactMessage {
  const name = readField(form, "name");
  const email = readField(form, "email");
  const topic = readField(form, "topic");
  const message = readField(form, "message");

  if (!name || name.length > contactLimits.name) {
    error(400, "Please enter your name.");
  }
  if (email.length > contactLimits.email || !emailPattern.test(email)) {
    error(400, "Please enter a valid email address.");
  }
  if (!isContactTopic(topic)) {
    error(400, "Please choose a topic.");
  }
  if (!message) {
    error(400, "Please enter a message.");
  }
  if (message.length > contactLimits.message) {
    error(
      400,
      `Please keep your message under ${contactLimits.message} characters.`
    );
  }

  return { email, message, name, topic };
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

export const POST: RequestHandler = async ({ fetch, request }) => {
  const webhookUrl = env.DISCORD_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    error(503, "The contact form isn't available right now.");
  }

  const form = await request.formData();
  if (readField(form, contactHoneypotField)) {
    return json({ ok: true });
  }

  const contact = parseContactMessage(form);
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
    error(502, "We couldn't send your message. Please try again.");
  }

  return json({ ok: true });
};
