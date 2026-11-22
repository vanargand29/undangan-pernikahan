import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { appendRecord } from "./store.js";
import { validateRSVP, validateWish, ValidationError } from "./validation.js";

const app = express();
const port = Number(process.env.PORT) || 3001;
const host = process.env.HOST || (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");
const rootDir = fileURLToPath(new URL("../", import.meta.url));
const distDir = path.join(rootDir, "dist");
const distIndex = path.join(distDir, "index.html");

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb", strict: true }));

app.post("/api/rsvps", async (req, res) => {
  const rsvp = validateRSVP(req.body);
  await appendRecord("rsvps", rsvp);
  res.status(201).json({ ok: true });
});

app.post("/api/wishes", async (req, res) => {
  const wish = validateWish(req.body);
  await appendRecord("wishes", wish);
  res.status(201).json({ ok: true });
});

app.use("/api", (_req, res) => res.status(404).json({ error: "Alamat API tidak ditemukan." }));

if (existsSync(distIndex)) {
  app.use(express.static(distDir, { fallthrough: true }));
  app.use((req, res) => {
    if (req.method === "GET" || req.method === "HEAD") return res.sendFile(distIndex);
    return res.sendStatus(404);
  });
}

app.use((error, _req, res, next) => {
  if (res.headersSent) return next(error);
  if (error instanceof ValidationError) return res.status(400).json({ error: error.message });
  if (error.type === "entity.too.large") return res.status(413).json({ error: "Data terlalu besar." });
  if (error instanceof SyntaxError && error.status === 400) return res.status(400).json({ error: "Format data tidak valid." });
  console.error("Request could not be saved.", error.message);
  return res.status(500).json({ error: "Data belum tersimpan. Silakan coba lagi." });
});

app.listen(port, host, () => {
  console.log(`Invitation server listening on port ${port}`);
});
