// Central business configuration for Pranay Traders.
export const BUSINESS = {
  name: "Pranay Traders",
  tagline: "Reliable Wood Charcoal Suppliers from Andhra Pradesh",
  subTagline: "Quality Charcoal for Bulk and Retail Trading",
  location: "Andhra Pradesh, India",
  phoneDisplay: "+91 99486 82259",
  phoneRaw: "+919948682259",
  whatsapp: "919948682259",
  emailPrimary: "pranaytradersap@gmail.com",
  emailSecondary: "contact@pranaytraders.com",
  linkedin: "https://www.linkedin.com/company/pranay-traders",
  instagram: "https://www.instagram.com/pranaytradersap",
  instagramHandle: "@pranaytradersap",
  facebook: "https://www.facebook.com/pranaytraders.ap",
  linkedinName: "Pranay Traders",
  // Google Maps embed centered on Andhra Pradesh
  mapsEmbed:
    "https://www.google.com/maps?q=Andhra+Pradesh,+India&output=embed",
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${BUSINESS.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Opens Gmail's compose window in the browser, addressed to the given email.
export function gmailComposeLink(to: string, subject?: string) {
  const params = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) params.set("su", subject);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
