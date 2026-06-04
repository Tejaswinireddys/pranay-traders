import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { GalleryItem } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Images, X } from "lucide-react";
import galWarehouse from "@/assets/gal_warehouse.jpg";
import galTruck from "@/assets/gal_truck.jpg";
import galPacking from "@/assets/gal_packing.jpg";
import galWood from "@/assets/gal_wood.jpg";
import galQuality from "@/assets/gal_quality.jpg";
import prodBulk from "@/assets/prod_bulk.jpg";
import prodWood from "@/assets/prod_wood.jpg";
import prodIndustrial from "@/assets/prod_industrial.jpg";

// Default showcase images — shown when the owner has not uploaded their own yet.
const DEFAULTS = [
  { img: galWarehouse, caption: "Organised warehouse storage", category: "Warehouse" },
  { img: prodBulk, caption: "Bulk charcoal sacks ready for dispatch", category: "Stock" },
  { img: galTruck, caption: "Loading charcoal for delivery", category: "Loading" },
  { img: galPacking, caption: "Packing charcoal into woven sacks", category: "Packaging" },
  { img: prodIndustrial, caption: "Industrial charcoal supply yard", category: "Stock" },
  { img: galWood, caption: "Seasoned hardwood logs", category: "Raw Material" },
  { img: galQuality, caption: "Quality inspection of charcoal", category: "Quality" },
  { img: prodWood, caption: "Premium hardwood lump charcoal", category: "Products" },
];

export default function Gallery() {
  const { data, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });
  const [lightbox, setLightbox] = useState<string | null>(null);

  const uploaded = data ?? [];
  const items =
    uploaded.length > 0
      ? uploaded.map((g) => ({
          img: g.imageUrl,
          caption: g.caption,
          category: g.category,
        }))
      : DEFAULTS;

  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Gallery
          </span>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Our charcoal, stock &amp; operations
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A look at our charcoal stock, packaging, loading, delivery,
            warehouse and day-to-day trading work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setLightbox(item.img)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-card-border bg-card text-left hover-elevate"
                data-testid={`gallery-item-${i}`}
              >
                <img
                  src={item.img}
                  alt={item.caption || "Charcoal gallery image"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {item.category && (
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-primary">
                      {item.category}
                    </span>
                  )}
                  {item.caption && (
                    <p className="text-sm font-semibold text-white">
                      {item.caption}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {!isLoading && uploaded.length === 0 && (
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Images className="h-4 w-4" /> Sample gallery shown. The owner can
            upload real photos from the admin panel.
          </p>
        )}
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          data-testid="gallery-lightbox"
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="Enlarged gallery image"
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
