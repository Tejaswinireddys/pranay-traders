import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Posts / business updates — owner-created. Optional image stored as a data URL.
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  body: text("body").notNull(),
  category: text("category").notNull().default("Announcement"),
  imageUrl: text("image_url"), // data URL (base64) or remote URL
  createdAt: integer("created_at").notNull(),
});

export const insertPostSchema = createInsertSchema(posts)
  .omit({ id: true, createdAt: true })
  .extend({
    title: z.string().min(2, "Title is required"),
    body: z.string().min(2, "Description is required"),
    category: z.string().min(1),
    imageUrl: z.string().optional().nullable(),
  });

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

// Gallery images — owner-managed.
export const galleryItems = sqliteTable("gallery_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  caption: text("caption").notNull().default(""),
  category: text("category").notNull().default("Stock"),
  imageUrl: text("image_url").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const insertGallerySchema = createInsertSchema(galleryItems)
  .omit({ id: true, createdAt: true })
  .extend({
    caption: z.string().optional().default(""),
    category: z.string().min(1),
    imageUrl: z.string().min(1, "Image is required"),
  });

export type InsertGalleryItem = z.infer<typeof insertGallerySchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;

// Contact / bulk-quote inquiries submitted from the website.
export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  quantity: text("quantity"),
  location: text("location"),
  message: text("message").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const insertInquirySchema = createInsertSchema(inquiries)
  .omit({ id: true, createdAt: true })
  .extend({
    name: z.string().min(2, "Please enter your name"),
    phone: z.string().min(6, "Please enter a valid phone number"),
    email: z.string().email("Enter a valid email").optional().or(z.literal("")),
    quantity: z.string().optional().or(z.literal("")),
    location: z.string().optional().or(z.literal("")),
    message: z.string().min(2, "Please enter a message"),
  });

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
