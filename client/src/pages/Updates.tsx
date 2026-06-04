import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Megaphone, X } from "lucide-react";

const CATEGORIES = [
  "All",
  "Stock Update",
  "New Arrival",
  "Delivery",
  "Supply Update",
  "Announcement",
];

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Updates() {
  const { data, isLoading } = useQuery<Post[]>({ queryKey: ["/api/posts"] });
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const posts = data ?? [];
  const filtered =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Updates &amp; Posts
          </span>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            News from Pranay Traders
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Stock updates, new arrivals, delivery photos, supply news and
            business announcements.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              data-testid={`filter-${c}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors hover-elevate ${
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center">
            <Megaphone className="h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              No updates yet
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {filter === "All"
                ? "New stock updates, arrivals and announcements will appear here. The owner can post them from the admin panel."
                : `No posts in "${filter}" yet. Try another category.`}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="flex flex-col overflow-hidden rounded-xl border border-card-border bg-card"
                data-testid={`card-post-${post.id}`}
              >
                {post.imageUrl && (
                  <button
                    onClick={() => setLightbox(post.imageUrl!)}
                    className="block aspect-[16/10] w-full overflow-hidden"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </button>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {post.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="Enlarged post image"
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
