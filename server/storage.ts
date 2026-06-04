import {
  posts,
  galleryItems,
  inquiries,
} from "@shared/schema";
import type {
  Post,
  InsertPost,
  GalleryItem,
  InsertGalleryItem,
  Inquiry,
  InsertInquiry,
} from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { eq, desc } from "drizzle-orm";

const sqlite = new Database("data.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);

export interface IStorage {
  // Posts
  getPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  deletePost(id: number): Promise<{ changes: number }>;
  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  deleteGalleryItem(id: number): Promise<{ changes: number }>;
  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  deleteInquiry(id: number): Promise<{ changes: number }>;
}

export class DatabaseStorage implements IStorage {
  async getPosts(): Promise<Post[]> {
    return db.select().from(posts).orderBy(desc(posts.createdAt)).all();
  }
  async createPost(post: InsertPost): Promise<Post> {
    return db
      .insert(posts)
      .values({ ...post, createdAt: Date.now() })
      .returning()
      .get();
  }
  async deletePost(id: number): Promise<{ changes: number }> {
    return db.delete(posts).where(eq(posts.id, id)).run();
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return db
      .select()
      .from(galleryItems)
      .orderBy(desc(galleryItems.createdAt))
      .all();
  }
  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    return db
      .insert(galleryItems)
      .values({ ...item, createdAt: Date.now() })
      .returning()
      .get();
  }
  async deleteGalleryItem(id: number): Promise<{ changes: number }> {
    return db.delete(galleryItems).where(eq(galleryItems.id, id)).run();
  }

  async getInquiries(): Promise<Inquiry[]> {
    return db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .all();
  }
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    return db
      .insert(inquiries)
      .values({ ...inquiry, createdAt: Date.now() })
      .returning()
      .get();
  }
  async deleteInquiry(id: number): Promise<{ changes: number }> {
    return db.delete(inquiries).where(eq(inquiries.id, id)).run();
  }
}

export const storage = new DatabaseStorage();
