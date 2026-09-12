import { FaqItem } from "./types";

/**
 * FAQ CONTENT — draft questions with placeholder answers.
 * `publicOnSite` gates both visible rendering and FAQPage schema.
 * Set to true only once an answer is approved and factually correct;
 * speculative answers must stay false.
 */
export const faqs: FaqItem[] = [
  {
    id: "check-in-out",
    question: "What are your check-in and check-out times?",
    answer: "[PLACEHOLDER: confirm check-in/check-out times]",
    topic: "stay",
    publicOnSite: false,
  },
  {
    id: "cancellation",
    question: "What is your cancellation and modification policy?",
    answer: "[PLACEHOLDER: confirm cancellation window and refund rules]",
    topic: "booking",
    publicOnSite: false,
  },
  {
    id: "children",
    question: "Do you allow children, and is an extra bed available?",
    answer: "[PLACEHOLDER: confirm child age policy and extra bed charges]",
    topic: "stay",
    publicOnSite: false,
  },
  {
    id: "pool-use",
    question: "Is the pool available to all guests?",
    answer: "[PLACEHOLDER: confirm pool hours and access rules]",
    topic: "stay",
    publicOnSite: false,
  },
  {
    id: "parking",
    question: "Is parking available on-site?",
    answer: "[PLACEHOLDER: confirm parking availability and capacity]",
    topic: "stay",
    publicOnSite: false,
  },
  {
    id: "dining",
    question: "What dining options are available at the resort?",
    answer: "[PLACEHOLDER: confirm The Backyard Cafe hours and offerings]",
    topic: "stay",
    publicOnSite: false,
  },
  {
    id: "pets",
    question: "Are pets allowed?",
    answer: "[PLACEHOLDER: confirm pet policy]",
    topic: "stay",
    publicOnSite: false,
  },
  {
    id: "group-enquiries",
    question: "How do I plan a stay for a large group?",
    answer: "[PLACEHOLDER: confirm group enquiry process and response time]",
    topic: "group",
    publicOnSite: false,
  },
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer: "[PLACEHOLDER: confirm accepted payment methods once payment provider is live]",
    topic: "booking",
    publicOnSite: false,
  },
  {
    id: "directions",
    question: "How do I get to The Blue Sky Resort from Mumbai/Pune?",
    answer: "[PLACEHOLDER: confirm approved travel guidance]",
    topic: "location",
    publicOnSite: false,
  },
];

export const publicFaqs = faqs.filter((f) => f.publicOnSite && f.answer && !f.answer.startsWith("[PLACEHOLDER"));

export const faqsByTopic = (topic: FaqItem["topic"]) => publicFaqs.filter((f) => f.topic === topic);
