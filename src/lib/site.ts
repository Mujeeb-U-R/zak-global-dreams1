export const SITE = {
  name: "ZAK Consultants (Pvt.) Ltd.",
  short: "ZAK Consultants",
  tagline: "Your Trusted Partner for Global Visa Solutions",
  phoneDisplay: "+92 334 944 8824",
  whatsappNumber: "923349448824",
  email: "info@zakconsultants.pk",
  address:
    "Office No. G-62, 5th Floor, GS Tower, Ring Road, Near Hayatabad Toll Plaza, Peshawar",
  hours: "Daily: 12:30 PM – 11:30 PM",
  legal: "Registered Private Limited Firm — SECP, Pakistan",
} as const;

export type VisaCategory =
  | "Work Permit"
  | "Visit Visa"
  | "Group Tour + Visit Visa"
  | "Student Visa";

export const VISA_CATALOG: {
  category: VisaCategory;
  tagline: string;
  processing: string;
  duration: string;
  countries: string[];
}[] = [
  {
    category: "Work Permit",
    tagline: "Legal employment routes with end-to-end documentation.",
    processing: "45–90 days",
    duration: "1–2 years renewable",
    countries: ["Kyrgyzstan", "Turkey", "Serbia", "Greece / Cyprus"],
  },
  {
    category: "Visit Visa",
    tagline: "Premier leisure & business travel processing.",
    processing: "15–45 days",
    duration: "Up to 10 years (multi-entry)",
    countries: ["U.S.A", "Canada", "Europe (Schengen)", "Japan"],
  },
  {
    category: "Group Tour + Visit Visa",
    tagline: "Curated group departures with full hospitality.",
    processing: "10–30 days",
    duration: "7–21 day itineraries",
    countries: [
      "Turkey",
      "Singapore",
      "Uzbekistan",
      "Malaysia",
      "Morocco",
      "Indonesia",
      "Maldives",
      "Thailand",
      "Sri Lanka",
    ],
  },
  {
    category: "Student Visa",
    tagline: "Accredited admissions & visa filing support.",
    processing: "30–90 days",
    duration: "Course length + post-study",
    countries: ["U.K", "Europe", "Turkey", "Thailand", "Indonesia", "China"],
  },
];

export const COUNTRY_FLAG: Record<string, string> = {
  Kyrgyzstan: "🇰🇬",
  Turkey: "🇹🇷",
  Serbia: "🇷🇸",
  "Greece / Cyprus": "🇬🇷",
  "U.S.A": "🇺🇸",
  Canada: "🇨🇦",
  "Europe (Schengen)": "🇪🇺",
  Japan: "🇯🇵",
  Singapore: "🇸🇬",
  Uzbekistan: "🇺🇿",
  Malaysia: "🇲🇾",
  Morocco: "🇲🇦",
  Indonesia: "🇮🇩",
  Maldives: "🇲🇻",
  Thailand: "🇹🇭",
  "Sri Lanka": "🇱🇰",
  "U.K": "🇬🇧",
  Europe: "🇪🇺",
  China: "🇨🇳",
};
