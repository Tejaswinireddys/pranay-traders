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
  instagram: "https://www.instagram.com/pranaytraders_ap",
  instagramHandle: "@pranaytraders_ap",
  // Google Maps embed centered on Andhra Pradesh
  mapsEmbed:
    "https://www.google.com/maps?q=Andhra+Pradesh,+India&output=embed",
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${BUSINESS.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
