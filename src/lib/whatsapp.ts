import { SITE } from "./site";

export interface VisaInquiry {
  fullName: string;
  phone: string;
  destination: string;
  category: string;
  employment: string;
  bankStatement: "Yes" | "No";
}

export function buildWhatsAppUrl(data: VisaInquiry): string {
  const lines = [
    "*ZAK Consultants — New Visa Assessment*",
    "",
    `*Full Name:* ${data.fullName}`,
    `*Phone:* ${data.phone}`,
    `*Destination:* ${data.destination}`,
    `*Visa Category:* ${data.category}`,
    `*Employment Status:* ${data.employment}`,
    `*6-Month Bank Statement:* ${data.bankStatement}`,
    "",
    "Please advise on eligibility and next steps. Thank you.",
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}
