import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  CheckCircle2,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      quantity: "",
      location: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InsertInquiry) =>
      apiRequest("POST", "/api/inquiries", data),
    onSuccess: () => {
      toast({
        title: "Inquiry sent",
        description:
          "Thank you. Pranay Traders has received your inquiry and will get back to you soon.",
      });
      form.reset();
    },
    onError: (e: Error) => {
      toast({
        title: "Could not send",
        description: e.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Contact Us
          </span>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Get a quote or ask a question
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Tell us your requirement and we will respond with pricing and
            availability. For quick inquiries, message us directly on WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* FORM */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-card-border bg-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-foreground">
                Product Inquiry Form
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fields marked with * are required.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((d) => mutation.mutate(d))}
                  className="mt-6 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              data-testid="input-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+91 ..."
                              data-testid="input-phone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              data-testid="input-email"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity Required</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 500 kg, 2 tons"
                              data-testid="input-quantity"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City / District, State"
                            data-testid="input-location"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Tell us about your charcoal requirement..."
                            data-testid="input-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="submit"
                      size="lg"
                      className="font-semibold"
                      disabled={mutation.isPending}
                      data-testid="button-submit-inquiry"
                    >
                      {mutation.isPending ? "Sending..." : "Send Inquiry"}
                    </Button>
                    <a
                      href={whatsappLink(
                        "Hello Pranay Traders, I would like to enquire about charcoal supply."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="font-semibold"
                        data-testid="button-contact-whatsapp"
                      >
                        <SiWhatsapp className="mr-2 h-4 w-4" /> Chat on WhatsApp
                      </Button>
                    </a>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="flex items-start gap-4 rounded-xl border border-card-border bg-card p-5 hover-elevate"
                data-testid="link-contact-phone"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Phone
                  </p>
                  <p className="font-semibold text-foreground">
                    {BUSINESS.phoneDisplay}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-xl border border-card-border bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email
                  </p>
                  <a
                    href={`mailto:${BUSINESS.emailPrimary}`}
                    className="block truncate font-semibold text-foreground hover:text-primary"
                  >
                    {BUSINESS.emailPrimary}
                  </a>
                  <a
                    href={`mailto:${BUSINESS.emailSecondary}`}
                    className="block truncate text-sm text-muted-foreground hover:text-primary"
                  >
                    {BUSINESS.emailSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-card-border bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Location
                  </p>
                  <p className="font-semibold text-foreground">
                    {BUSINESS.location}
                  </p>
                </div>
              </div>

              {/* SOCIAL */}
              <div className="rounded-xl border border-card-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Follow Us
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={BUSINESS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground hover-elevate"
                    data-testid="link-contact-linkedin"
                  >
                    <Linkedin className="h-4 w-4 text-primary" /> LinkedIn
                  </a>
                  <a
                    href={BUSINESS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground hover-elevate"
                    data-testid="link-contact-instagram"
                  >
                    <Instagram className="h-4 w-4 text-primary" /> {BUSINESS.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/10 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Bulk &amp;
                  recurring supply welcome
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We support delivery across Andhra Pradesh and nearby regions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">
            Find Us
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-card-border">
            <iframe
              title="Pranay Traders location map"
              src={BUSINESS.mapsEmbed}
              width="100%"
              height="380"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="map-embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
