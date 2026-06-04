import type { Express, Request, Response, NextFunction } from "express";
import { createServer } from "node:http";
import type { Server } from "node:http";
import { storage } from "./storage";
import {
  insertPostSchema,
  insertGallerySchema,
  insertInquirySchema,
} from "@shared/schema";

// Simple admin auth. The owner logs in with this password; the client then
// sends it on every admin write request via the x-admin-token header.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "pranay@2024";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-admin-token");
  if (token !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Allow large base64 image uploads
  app.use((req, res, next) => next());

  // ---- Admin login ----
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body ?? {};
    if (password === ADMIN_PASSWORD) {
      return res.json({ token: ADMIN_PASSWORD });
    }
    return res.status(401).json({ message: "Incorrect password" });
  });

  // ---- Posts (public read) ----
  app.get("/api/posts", async (_req, res) => {
    res.json(await storage.getPosts());
  });

  app.post("/api/posts", requireAdmin, async (req, res) => {
    const parsed = insertPostSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0]?.message });
    }
    res.status(201).json(await storage.createPost(parsed.data));
  });

  app.delete("/api/posts/:id", requireAdmin, async (req, res) => {
    const result = await storage.deletePost(Number(req.params.id));
    res.json(result);
  });

  // ---- Gallery (public read) ----
  app.get("/api/gallery", async (_req, res) => {
    res.json(await storage.getGalleryItems());
  });

  app.post("/api/gallery", requireAdmin, async (req, res) => {
    const parsed = insertGallerySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0]?.message });
    }
    res.status(201).json(await storage.createGalleryItem(parsed.data));
  });

  app.delete("/api/gallery/:id", requireAdmin, async (req, res) => {
    const result = await storage.deleteGalleryItem(Number(req.params.id));
    res.json(result);
  });

  // ---- Inquiries (public create, admin read/delete) ----
  app.post("/api/inquiries", async (req, res) => {
    const parsed = insertInquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0]?.message });
    }
    res.status(201).json(await storage.createInquiry(parsed.data));
  });

  app.get("/api/inquiries", requireAdmin, async (_req, res) => {
    res.json(await storage.getInquiries());
  });

  app.delete("/api/inquiries/:id", requireAdmin, async (req, res) => {
    const result = await storage.deleteInquiry(Number(req.params.id));
    res.json(result);
  });

  return httpServer;
}
