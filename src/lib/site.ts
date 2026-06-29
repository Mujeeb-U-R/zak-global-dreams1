export const SITE = {
  name: "ZAK Consultants (Pvt.) Ltd.",
  short: "ZAK Consultants",
  // Public path to the site logo. Using the uploaded transparent PNG.
  logo: "/zak_logo-removebg-preview.png",
  tagline: "Your Trusted Partner for Global Visa Solutions",
  phoneDisplay: "+92 333 864 2226",
  whatsappNumber: "923338642226",
  email: "zakconsultants21@gmail.com",
  address:
    "Office No. G-62, 5th Floor, GS Tower, Ring Road, Near Hayatabad Toll Plaza, Peshawar",
  hours: "Monday-Saturday: 10:00 AM – 6:00 PM",
  legal: "Registered Private Limited Firm, Pakistan",

  mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.7342963349092!2d71.45425507435851!3d33.97366822187761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d911d507fd6ddf%3A0x493a3de071281f6d!2sZAK%20Consultants%20(PVT.)%20LTD.!5e0!3m2!1sen!2sus!4v1782351036066!5m2!1sen!2sus",
} as const;

export type VisaCategory =
  | "Work Permit"
  | "Visit Visa"
  | "Group Tour"
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
    category: "Group Tour",
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
