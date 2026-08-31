import { GroupConfiguration, GroupUseCase } from "./types";

export const groupUseCases: GroupUseCase[] = [
  { id: "family", label: "Family stays", verified: false },
  { id: "reunions", label: "Reunions", verified: false },
  { id: "celebrations", label: "Celebrations", verified: false },
  { id: "get-togethers", label: "Friends' get-togethers", verified: false },
  { id: "offsites", label: "Corporate offsites", verified: false },
];

/**
 * Group configurations are inquiry-oriented by default — do not
 * publish specific room-combination capacities until the resort
 * team verifies actual multi-room / interconnecting availability.
 */
export const groupConfigurations: GroupConfiguration[] = [
  { id: "config-1", label: "[PLACEHOLDER: e.g. 3 interconnecting rooms, up to 12 guests]", verified: false },
  { id: "config-2", label: "[PLACEHOLDER: e.g. Whole-wing multi-room block]", verified: false },
];

export const groupPlanningSteps = [
  {
    step: 1,
    title: "Tell us about your group",
    body: "Share your dates, group size, and occasion through the enquiry form or WhatsApp.",
  },
  {
    step: 2,
    title: "We check what fits",
    body: "Our team reviews room combinations and availability and gets back to you with options.",
  },
  {
    step: 3,
    title: "Confirm and pay",
    body: "[PLACEHOLDER: confirm deposit/payment process for group bookings]",
  },
  {
    step: 4,
    title: "Arrive and settle in",
    body: "[PLACEHOLDER: confirm group check-in / coordination process]",
  },
];
