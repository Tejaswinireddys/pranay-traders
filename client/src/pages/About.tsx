import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, HandCoins, Users, Target, Eye } from "lucide-react";
import galWarehouse from "@/assets/gal_warehouse.jpg";
import galPacking from "@/assets/gal_packing.jpg";
import galWood from "@/assets/gal_wood.jpg";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Quality Supply",
    desc: "We source and grade our charcoal carefully so customers receive clean, high-heat, low-ash stock every time.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    desc: "Dependable logistics mean your charcoal reaches you on schedule, whether it is a single load or a recurring supply.",
  },
  {
    icon: HandCoins,
    title: "Honest Pricing",
    desc: "Fair, transparent rates with no hidden costs — pricing that works for retailers and large bulk buyers alike.",
  },
  {
    icon: Users,
    title: "Long-Term Relationships",
    desc: "Most of our business comes from repeat customers who trust us to deliver consistently, season after season.",
  },
];

export default function About() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            About Us
          </span>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            A trusted name in wood charcoal trading
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Pranay Traders is a wood charcoal trading business based in Andhra
            Pradesh, India, supplying quality charcoal to customers across the
            region.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
              Who we are
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Pranay Traders is a charcoal trading business rooted in Andhra
                Pradesh, India. We specialise in the supply and trading of wood
                charcoal for wholesalers, retailers, hotels, restaurants,
                barbecue users, industrial buyers and bulk customers.
              </p>
              <p>
                Our work is straightforward: source good charcoal, grade it
                properly, store it well and deliver it on time at an honest
                price. That simple discipline has helped us build steady,
                long-term relationships with buyers who depend on a reliable
                supply.
              </p>
              <p>
                Whether you need a few retail bags or a full industrial
                consignment, we handle every order with the same care — clear
                communication, fair pricing and stock you can trust.
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              <Link href="/products">
                <Button className="font-semibold" data-testid="button-about-products">
                  View Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="font-semibold" data-testid="button-about-contact">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={galWarehouse}
              alt="Charcoal warehouse storage"
              className="col-span-2 aspect-[16/10] w-full rounded-xl object-cover shadow-md"
            />
            <img
              src={galWood}
              alt="Seasoned hardwood logs"
              className="aspect-square w-full rounded-xl object-cover shadow-md"
            />
            <img
              src={galPacking}
              alt="Packing charcoal into sacks"
              className="aspect-square w-full rounded-xl object-cover shadow-md"
            />
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-card-border bg-background p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-foreground">
              Our Mission
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              To be the most dependable wood charcoal supplier in Andhra
              Pradesh — delivering consistent quality, fair pricing and reliable
              service to every customer, large or small.
            </p>
          </div>
          <div className="rounded-2xl border border-card-border bg-background p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-foreground">
              Our Vision
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              To grow into a leading regional charcoal trading partner by
              earning trust through honesty, quality supply and long-lasting
              customer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            What we stand for
          </h2>
          <p className="mt-3 text-muted-foreground">
            The principles that guide how we trade and serve our customers.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-card-border bg-card p-6"
              data-testid={`card-value-${v.title}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-foreground">{v.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
