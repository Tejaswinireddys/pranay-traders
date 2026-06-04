import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAdmin } from "@/lib/admin";
import { useToast } from "@/hooks/use-toast";
import type { Post, GalleryItem, Inquiry } from "@shared/schema";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Lock,
  LogOut,
  Upload,
  Trash2,
  ImagePlus,
  Megaphone,
  Images,
  Inbox,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const POST_CATEGORIES = [
  "Announcement",
  "Stock Update",
  "New Arrival",
  "Delivery",
  "Supply Update",
];
const GALLERY_CATEGORIES = [
  "Stock",
  "Packaging",
  "Loading",
  "Delivery",
  "Warehouse",
  "Raw Material",
  "Quality",
  "Products",
];

// Compress + convert an image File to a data URL to keep payloads small.
function fileToDataUrl(file: File, maxDim = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function LoginScreen() {
  const { setToken } = useAdmin();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/admin/login", { password });
      const { token } = await res.json();
      setToken(token);
      toast({ title: "Welcome", description: "You are now signed in." });
    } catch {
      toast({
        title: "Login failed",
        description: "Incorrect password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16">
      <div className="w-full rounded-2xl border border-card-border bg-card p-8">
        <div className="flex justify-center">
          <Logo showText={false} />
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-extrabold text-foreground">
          Owner Login
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Sign in to manage posts, gallery photos and inquiries.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="admin-pass">Password</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="pl-9"
                data-testid="input-admin-password"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={loading}
            data-testid="button-admin-login"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Default password: <span className="font-mono font-semibold">pranay@2024</span>
        </p>
      </div>
    </div>
  );
}

function ImageDrop({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please select an image.", variant: "destructive" });
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      onChange(dataUrl);
    } catch {
      toast({ title: "Upload error", description: "Could not read the image.", variant: "destructive" });
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
        data-testid="input-image-file"
      />
      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-border">
          <img src={value} alt="Preview" className="h-48 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
            data-testid="button-remove-image"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background text-muted-foreground hover-elevate"
          data-testid="button-pick-image"
        >
          <ImagePlus className="h-7 w-7" />
          <span className="text-sm font-semibold">Click to upload a photo</span>
          <span className="text-xs">JPG / PNG — auto-compressed</span>
        </button>
      )}
    </div>
  );
}

function PostsManager() {
  const { toast } = useToast();
  const { data: posts, isLoading } = useQuery<Post[]>({ queryKey: ["/api/posts"] });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Announcement");
  const [image, setImage] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () =>
      apiRequest("POST", "/api/posts", { title, body, category, imageUrl: image }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setTitle("");
      setBody("");
      setCategory("Announcement");
      setImage(null);
      toast({ title: "Post published", description: "Your update is now live." });
    },
    onError: (e: Error) =>
      toast({ title: "Could not publish", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({ title: "Deleted" });
    },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-card-border bg-card p-6">
        <h3 className="font-display text-lg font-bold text-foreground">
          Create a Post
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Share stock updates, new arrivals, delivery photos or announcements.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim() || !body.trim())
              return toast({ title: "Missing fields", description: "Title and description are required.", variant: "destructive" });
            create.mutate();
          }}
          className="mt-5 space-y-4"
        >
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fresh stock arrived"
              className="mt-1.5"
              data-testid="input-post-title"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5" data-testid="select-post-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {POST_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Write the details of this update..."
              className="mt-1.5"
              data-testid="input-post-body"
            />
          </div>
          <div>
            <Label>Photo (optional)</Label>
            <div className="mt-1.5">
              <ImageDrop value={image} onChange={setImage} />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={create.isPending}
            data-testid="button-create-post"
          >
            <Upload className="mr-2 h-4 w-4" />
            {create.isPending ? "Publishing..." : "Publish Post"}
          </Button>
        </form>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-foreground">
          Existing Posts ({posts?.length ?? 0})
        </h3>
        <div className="mt-4 space-y-3">
          {isLoading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          ) : posts && posts.length > 0 ? (
            posts.map((p) => (
              <div
                key={p.id}
                className="flex gap-3 rounded-xl border border-card-border bg-card p-3"
                data-testid={`admin-post-${p.id}`}
              >
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                  <p className="truncate font-semibold text-foreground">{p.title}</p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{p.body}</p>
                </div>
                <button
                  onClick={() => remove.mutate(p.id)}
                  className="self-start text-muted-foreground hover:text-destructive"
                  data-testid={`button-delete-post-${p.id}`}
                  aria-label="Delete post"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
              No posts yet. Create your first update.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryManager() {
  const { toast } = useToast();
  const { data: items, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery"],
  });
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Stock");
  const [image, setImage] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () =>
      apiRequest("POST", "/api/gallery", { caption, category, imageUrl: image }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      setCaption("");
      setCategory("Stock");
      setImage(null);
      toast({ title: "Photo added to gallery" });
    },
    onError: (e: Error) =>
      toast({ title: "Could not upload", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/gallery/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Deleted" });
    },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-card-border bg-card p-6">
        <h3 className="font-display text-lg font-bold text-foreground">
          Add Gallery Photo
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload photos of stock, packaging, loading, delivery or your warehouse.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!image)
              return toast({ title: "No image", description: "Please select a photo.", variant: "destructive" });
            create.mutate();
          }}
          className="mt-5 space-y-4"
        >
          <div>
            <Label>Photo</Label>
            <div className="mt-1.5">
              <ImageDrop value={image} onChange={setImage} />
            </div>
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1.5" data-testid="select-gallery-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GALLERY_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Caption (optional)</Label>
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. New stock loaded for delivery"
              className="mt-1.5"
              data-testid="input-gallery-caption"
            />
          </div>
          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={create.isPending}
            data-testid="button-add-gallery"
          >
            <Upload className="mr-2 h-4 w-4" />
            {create.isPending ? "Uploading..." : "Add to Gallery"}
          </Button>
        </form>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-foreground">
          Gallery Photos ({items?.length ?? 0})
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))
          ) : items && items.length > 0 ? (
            items.map((g) => (
              <div
                key={g.id}
                className="group relative aspect-square overflow-hidden rounded-lg border border-card-border"
                data-testid={`admin-gallery-${g.id}`}
              >
                <img src={g.imageUrl} alt={g.caption} className="h-full w-full object-cover" />
                <button
                  onClick={() => remove.mutate(g.id)}
                  className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  data-testid={`button-delete-gallery-${g.id}`}
                  aria-label="Delete photo"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
              No gallery photos yet. The public gallery shows sample images until you add your own.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function InquiriesManager() {
  const { toast } = useToast();
  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });
  const remove = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/inquiries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
      toast({ title: "Deleted" });
    },
  });

  if (isLoading)
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    );

  if (!inquiries || inquiries.length === 0)
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card py-16 text-center">
        <Inbox className="h-10 w-10 text-muted-foreground" />
        <p className="mt-3 font-semibold text-foreground">No inquiries yet</p>
        <p className="text-sm text-muted-foreground">
          Inquiries submitted from the contact form will appear here.
        </p>
      </div>
    );

  return (
    <div className="space-y-3">
      {inquiries.map((q) => (
        <div
          key={q.id}
          className="rounded-xl border border-card-border bg-card p-5"
          data-testid={`inquiry-${q.id}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-foreground">{q.name}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(q.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
            <button
              onClick={() => remove.mutate(q.id)}
              className="text-muted-foreground hover:text-destructive"
              data-testid={`button-delete-inquiry-${q.id}`}
              aria-label="Delete inquiry"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" /> {q.phone}
            </span>
            {q.email && (
              <span className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" /> {q.email}
              </span>
            )}
            {q.location && (
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {q.location}
              </span>
            )}
            {q.quantity && (
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">Qty:</span> {q.quantity}
              </span>
            )}
          </div>
          <p className="mt-3 whitespace-pre-line text-sm text-foreground">{q.message}</p>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const { isAdmin, setToken } = useAdmin();

  if (!isAdmin) return <LoginScreen />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage posts, gallery photos and customer inquiries.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setToken(null)}
          className="font-semibold"
          data-testid="button-logout"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="posts" className="mt-8">
        <TabsList>
          <TabsTrigger value="posts" data-testid="tab-posts">
            <Megaphone className="mr-2 h-4 w-4" /> Posts
          </TabsTrigger>
          <TabsTrigger value="gallery" data-testid="tab-gallery">
            <Images className="mr-2 h-4 w-4" /> Gallery
          </TabsTrigger>
          <TabsTrigger value="inquiries" data-testid="tab-inquiries">
            <Inbox className="mr-2 h-4 w-4" /> Inquiries
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6">
          <PostsManager />
        </TabsContent>
        <TabsContent value="gallery" className="mt-6">
          <GalleryManager />
        </TabsContent>
        <TabsContent value="inquiries" className="mt-6">
          <InquiriesManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
