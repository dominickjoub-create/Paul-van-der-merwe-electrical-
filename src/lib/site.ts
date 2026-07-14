/**
 * Central business configuration.
 * Everything a non-developer might need to change lives here.
 */

export const site = {
  name: "Paul van der Merwe Electrical",
  shortName: "PVDM Electrical",
  tagline: "Powering homes. Energising businesses. Lighting the way.",
  description:
    "Qualified, certified & compliant electrician serving homes and businesses. Residential, commercial & industrial electrical, fault finding, LED upgrades, electric fencing and solar & inverter installations. Fast, honest, reliable.",

  // Change this to the live domain when it goes live.
  url: "https://pvdmelectrical.co.za",

  // Contact — used for tel:, mailto: and WhatsApp deep links.
  phoneDisplay: "076 753 0027",
  phoneE164: "+27767530027",
  whatsapp: "27767530027", // wa.me format (no +, no spaces)
  email: "paulvdm33@gmail.com",
  facebook: "https://www.facebook.com/",

  // Trading area — helps local SEO. Adjust as needed.
  areaServed: "Gauteng, South Africa",
  region: "ZA",

  hours: {
    label: "Mon–Sat, 7:00–17:00",
    note: "Standby for emergencies",
  },

  offer: {
    badge: "New customers",
    headline: "10% off your first service",
    note: "Mention this offer when you send your request.",
  },
} as const;

export type ServiceId =
  | "residential"
  | "commercial"
  | "industrial"
  | "fault-finding"
  | "led"
  | "fencing"
  | "solar";

export interface Service {
  id: ServiceId;
  title: string;
  short: string;
  blurb: string;
  points: string[];
  /**
   * Optional follow-up question shown in the quote form when this service is
   * selected (e.g. how many metres of fencing). Its answer is added to the
   * WhatsApp message.
   */
  ask?: { label: string; placeholder: string };
}

export const services: Service[] = [
  {
    id: "residential",
    title: "Residential Electrical",
    short: "Homes & estates",
    blurb:
      "Safe, tidy wiring and repairs for houses, cottages and complexes, from a single plug point to a full rewire.",
    points: ["Plugs, lights & DB boards", "Rewires & extensions", "Compliance certificates (CoC)"],
  },
  {
    id: "commercial",
    title: "Commercial Electrical",
    short: "Shops & offices",
    blurb:
      "Reliable electrical for offices, retail and hospitality that keeps your doors open and your team working.",
    points: ["Shopfit & office installs", "Maintenance contracts", "Load & DB upgrades"],
  },
  {
    id: "industrial",
    title: "Industrial Solutions",
    short: "Plants & workshops",
    blurb:
      "Three-phase power, machine wiring and control work built to handle demanding industrial environments.",
    points: ["Three-phase installs", "Motor & machine wiring", "Distribution & control panels"],
    ask: {
      label: "What needs power?",
      placeholder: "e.g. 3-phase machine, workshop, pump",
    },
  },
  {
    id: "fault-finding",
    title: "Fault Finding & Repairs",
    short: "Something's wrong?",
    blurb:
      "Tripping breakers, dead circuits or that burning smell. We track the fault down and fix it properly.",
    points: ["Trip & short-circuit diagnosis", "Emergency breakdowns", "Same-day repairs where possible"],
  },
  {
    id: "led",
    title: "LED Lighting Upgrades",
    short: "Brighter, cheaper",
    blurb:
      "Swap tired, power-hungry fittings for crisp, efficient LED lighting inside and out, and cut your bill.",
    points: ["Indoor & outdoor lighting", "Downlights & floodlights", "Sensor & security lighting"],
  },
  {
    id: "fencing",
    title: "Electric Fencing",
    short: "Secure the perimeter",
    blurb:
      "New electric fence installs, energiser repairs and compliance certificates to keep your property secure.",
    points: ["New installs & extensions", "Energiser & fault repairs", "Electric fence CoC"],
    ask: {
      label: "Roughly how many metres?",
      placeholder: "e.g. 60 m",
    },
  },
  {
    id: "solar",
    title: "Solar & Inverter Solutions",
    short: "Beat load-shedding",
    blurb:
      "Backup and solar systems sized to your needs so the lights, Wi-Fi and fridge stay on through the dark.",
    points: ["Inverter & battery backup", "Solar PV installations", "System sizing & advice"],
  },
];

export const whyChooseUs: { title: string; body: string }[] = [
  {
    title: "Qualified & Experienced",
    body: "Certified, compliant work you can rely on, done by a hands-on electrician, not a call centre.",
  },
  {
    title: "Reliable & On Time",
    body: "We show up when we say we will and keep you posted, so you're never left guessing.",
  },
  {
    title: "High-Quality Workmanship",
    body: "Neat, safe installations built to last and to pass inspection the first time.",
  },
  {
    title: "Upfront & Honest Pricing",
    body: "Clear quotes before we start. No surprise call-out fees just to get a number.",
  },
];

export type PropertyType = "Home" | "Business" | "Industrial";

export const propertyTypes: PropertyType[] = ["Home", "Business", "Industrial"];
