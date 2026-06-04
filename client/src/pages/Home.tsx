import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { BUSINESS, whatsappLink } from "@/lib/business";
import type { Post } from "@shared/schema";
import {
  Flame,
  Truck,
  ShieldCheck,
  HandCoins,
  Package,
  Factory,
  Utensils,
  Boxes,
  ArrowRight,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import heroImg from "@/assets/hero.jpg";
import prodWood from "@/assets/prod_wood.jpg";
import prodBulk from "@/assets/prod_bulk.jpg";
import prodBbq from "@/assets/prod_bbq.jpg";
import prodIndustrial from "@/assets/prod_industrial.jpg";
import galQuality from "@/assets/gal_quality.jpg";

const PRODUCTS = [
  {
    icon: Flame,
    title: "Wood Charcoal",
    desc: "Premium natural hardwood lump charcoal with high heat and low ash.",
    img: prodWood,
  },
  {
    icon: Boxes,
    title: "Bulk Charcoal Bags",
    desc: "Woven & jute sacks for wholesalers and retailers, packed by weight.",
    img: prodBulk,
  },
  {
    icon: Utensils,
    title: "Restaurant / BBQ Charcoal",
    desc: "Long-burning, consistent coals for hotels, restaurants and grills.",
    img: prodBbq,
  },
  {
    icon: Factory,
    title: "Industrial Charcoal Supply",
    desc: "High-volume charcoal for industrial buyers and bulk contracts.",
    img: prodIndustrial,
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "Quality Supply" },
  { icon: Boxes, label: "Bulk Orders" },
  { icon: Truck, label: "Delivery Support" },
  { icon: HandCoins, label: "Honest Pricing" },
];

const WHY = [
  {
    icon: ShieldCheck,
    title: "Consistent Quality",
    desc: "Every consignment is checked for moisture, ash content and burn quality before it leaves our yard.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    desc: "Reliable logistics across Andhra Pradesh and beyond, so your stock arrives when you need it.",
  },
  {
    icon: HandCoins,
    title: "Honest Pricing",
    desc: "Transparent rates with no hidden charges — fair pricing for both small retailers and bulk buyers.",
  },
  {
    icon: HandCoins,
    title: "Long-Term Relationships",
    desc: "We build trust through dependable supply and personal service, season after season.",
  },
];

export default function Home() {
  const { data: posts } = useQuery<Post[]>({ queryKey: ["/api/posts"] });
  const latest = (posts ?? []).slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Glowing wood charcoal embers"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30 dark:from-black dark:via-black/85 dark:to-black/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Flame className="h-3.5 w-3.5" /> Andhra Pradesh, India
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Reliable Wood Charcoal{" "}
              <span className="text-primary">Suppliers</span> from Andhra
              Pradesh
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              {BUSINESS.subTagline}. Pranay Traders supplies premium wood
              charcoal to wholesalers, retailers, hotels, restaurants, BBQ users
              and industrial buyers — with quality, timely delivery and honest
              pricing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg" className="font-semibold" data-testid="button-hero-contact">
                  Contact Us
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-semibold"
                  data-testid="button-hero-quote"
                >
                  Request Bulk Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground/30 font-semibold"
                  data-testid="button-hero-products"
                >
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <t.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-foreground sm:text-base">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Our Charcoal Products
          </h2>
          <p className="mt-3 text-muted-foreground">
            From single retail bags to industrial bulk contracts — quality
            charcoal for every customer.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <div
              key={p.title}
              data-testid={`card-product-${p.title}`}
              className="group overflow-hidden rounded-xl border border-card-border bg-card hover-elevate"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-background/90 text-primary backdrop-blur">
                  <p.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/products">
            <Button variant="outline" className="font-semibold" data-testid="button-view-all-products">
              View All Products <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <img
              src={galQuality}
              alt="Inspecting premium wood charcoal"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
            />
            <div className="absolute -bottom-5 -right-3 hidden rounded-xl border border-card-border bg-background px-6 py-4 shadow-lg sm:block">
              <p className="font-display text-2xl font-extrabold text-primary">
                100%
              </p>
              <p className="text-xs font-semibold text-muted-foreground">
                Quality Checked Stock
              </p>
            </div>
          </div>
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-primary">
              Why Choose Pranay Traders
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              A charcoal trading partner you can rely on
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {WHY.map((w) => (
                <div key={w.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{w.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {w.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Who We Supply
          </h2>
          <p className="mt-3 text-muted-foreground">
            Trusted by a wide range of charcoal buyers across the region.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "Wholesalers",
            "Retailers",
            "Hotels",
            "Restaurants",
            "BBQ Users",
            "Industrial Buyers",
            "Bulk Customers",
          ].map((aud) => (
            <span
              key={aud}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground"
            >
              <CheckCircle2 className="h-4 w-4 text-primary" /> {aud}
            </span>
          ))}
        </div>
      </section>

      {/* LATEST UPDATES */}
      {latest.length > 0 && (
        <section className="bg-card">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm font-bold uppercase tracking-wider text-primary">
                  From the Yard
                </span>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Latest Updates
                </h2>
              </div>
              <Link href="/updates" className="hidden sm:block">
                <Button variant="outline" size="sm" className="font-semibold">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {latest.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-xl border border-card-border bg-background"
                  data-testid={`card-home-post-${post.id}`}
                >
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-44 w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {post.category}
                    </span>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {post.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIAL / TRUST QUOTE */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <Quote className="mx-auto h-10 w-10 text-primary/40" />
        <p className="mt-5 font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
          “We believe charcoal trading is built on trust. Quality stock, fair
          prices and delivery you can count on — that is how we keep our
          customers coming back.”
        </p>
        <p className="mt-5 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          — Pranay Traders
        </p>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-sidebar">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center sm:p-12 lg:flex-row lg:text-left">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-sidebar-foreground sm:text-3xl">
                Ready to order quality wood charcoal?
              </h2>
              <p className="mt-2 text-sidebar-foreground/75">
                Get a fast bulk quote or talk to us directly on WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="font-semibold" data-testid="button-cta-quote">
                  Request Bulk Quote
                </Button>
              </Link>
              <a
                href={whatsappLink(
                  "Hello Pranay Traders, I would like a charcoal quote."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sidebar-foreground/30 font-semibold text-sidebar-foreground"
                  data-testid="button-cta-whatsapp"
                >
                  <SiWhatsapp className="mr-2 h-4 w-4" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
