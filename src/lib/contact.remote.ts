import {
  colocationInquirySchema,
  contactMessageSchema,
  forwardToDiscord,
} from "#lib/server/contact.js";
import { form } from "$app/server";

export const sendContactMessage = form(
  contactMessageSchema,
  async ({ company_website, ...contact }) => {
    if (company_website) {
      return;
    }
    await forwardToDiscord(contact);
  }
);

export const sendColocationInquiry = form(
  colocationInquirySchema,
  async ({ company_website, email, hardware, name, notes, space }) => {
    if (company_website) {
      return;
    }
    await forwardToDiscord({
      email,
      message: [
        `Rack space: ${space}`,
        "",
        "Hardware:",
        hardware,
        ...(notes ? ["", "Notes:", notes] : []),
      ].join("\n"),
      name,
      topic: "Colocation",
    });
  }
);
