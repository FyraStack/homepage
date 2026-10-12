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
  inquiryField: 1900,
  inquirySpace: 100,
  message: 4000,
  name: 100,
};
