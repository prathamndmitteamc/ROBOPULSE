import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT) || 3e3;
app.get(["/healthz", "/health", "/_ah/health", "/ping"], (_req, res) => {
  res.status(200).send("OK");
});
app.use(express.json());
const distPath = path.resolve(__dirname, "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
app.get("*", (_req, res) => {
  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Robopulse Intelligence</title>
  </head>
  <body style="background:#030303;color:#00C9FF;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
    <div style="text-align:center;">
      <h1 style="font-size:24px;margin-bottom:8px;">Robopulse Intelligence</h1>
      <p style="color:#A9D4FF;font-size:14px;">Building the Intelligence Behind Tomorrow.</p>
    </div>
  </body>
</html>`);
  }
});
app.use((err, _req, res, _next) => {
  console.error("Unhandled server error:", err);
  res.status(200).send("OK");
});
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing HTTP server");
  server.close(() => console.log("HTTP server closed"));
});
process.on("SIGINT", () => {
  console.log("SIGINT received: closing HTTP server");
  server.close(() => console.log("HTTP server closed"));
});
