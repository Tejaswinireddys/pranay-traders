import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { whatsappLink } from "@/lib/business";
import { Flame, Boxes, Utensils, Factory, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import prodWood from "@/assets/prod_wood.jpg";
import prodBulk from "@/assets/prod_bulk.jpg";
import prodBbq from "@/assets/prod_bbq.jpg";
import prodIndustrial from "@/assets/prod_industrial.jpg";

const PRODUCTS = [
  {
    id: "wood-charcoal",
    icon: Flame,
    title: "Wood Charcoal",
    img: prodWood,
    desc: "Premium natural hardwood lump charcoal with high calorific value, low ash and a clean, long burn. Ideal for retail sale and everyday cooking use.",
    features: [
      "Natural hardwood, no chemicals",
      "High heat, low ash content",
      "Clean, long-lasting burn",
      "Graded and quality checked",
    ],
    quantities: ["5 kg", "10 kg", "25 kg", "Custom"],
  },
  {
    id: "bulk-bags",
    icon: Boxes,
    title: "Bulk Charcoal Bags",
    img: prodBulk,
    desc: "Wood charcoal packed in sturdy woven and jute sacks for wholesalers and retailers. Supplied by weight with flexible packing to suit your business.",
    features: [
      "Woven & jute sack packing",
      "Wholesale & retail quantities",
      "Consistent fill weight",
      "Stackable for easy storage",
    ],
    quantities: ["25 kg bag", "50 kg bag", "1 Ton", "Truck Load"],
  },
  {
    id: "bbq-charcoal",
    icon: Utensils,
    title: "Restaurant / BBQ Charcoal",
    img: prodBbq,
    desc: "Long-burning, consistent charcoal made for hotels, restaurants, grill kitchens and barbecue users who need dependable heat for service.",
    features: [
      "Steady, even heat for grilling",
      "Minimal smoke and sparking",
      "Ideal for hotels & restaurants",
      "Regular supply contracts available",
    ],
    quantities: ["10 kg", "25 kg", "Monthly Supply", "Custom"],
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrial Charcoal Supply",
    img: prodIndustrial,
    desc: "High-volume wood charcoal for industrial buyers and bulk contracts. Reliable, large-scale supply with consistent quality across consignments.",
    features: [
      "High-volume bulk contracts",
      "Consistent batch quality",
      "Scheduled recurring delivery",
      "Competitive contract pricing",
    ],
    quantities: ["1 Ton", "5 Tons", "10+ Tons", "Contract"],
  },
];

export default function Products() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Our Products
          </span>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Quality wood charcoal for every buyer
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Choose the charcoal that fits your need — from retail bags to
            industrial bulk supply. Send us an inquiry for current pricing and
            availability.
          </p>
        </div>
      </section>

      {/* PRODUCT BLOCKS */}
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        {PRODUCTS.map((p, i) => (
          <section
            key={p.id}
            id={p.id}
            className="grid items-center gap-10 lg:grid-cols-2"
            data-testid={`section-product-${p.id}`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <img
                src={p.img}
                alt={p.title}
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
              />
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground">
                {p.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {p.desc}
              </p>

              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Quantity Options
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.quantities.map((q) => (
                    <Badge
                      key={q}
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                    >
                      {q}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button className="font-semibold" data-testid={`button-inquire-${p.id}`}>
                    Inquire / Request Quote
                  </Button>
                </Link>
                <a
                  href={whatsappLink(
                    `Hello Pranay Traders, I am interested in ${p.title}. Please share pricing and availability.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="font-semibold"
                    data-testid={`button-whatsapp-${p.id}`}
                  >
                    <SiWhatsapp className="mr-2 h-4 w-4" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <section className="bg-card">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
            Need a custom quantity or recurring supply?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tell us what you need and we will prepare a quote tailored to your
            business.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/contact">
              <Button size="lg" className="font-semibold" data-testid="button-products-quote">
                Request Bulk Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
