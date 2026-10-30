import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-chat-dev-server',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/robots.txt') {
              const robotsPath = path.resolve(__dirname, 'public/robots.txt');
              if (fs.existsSync(robotsPath)) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 200;
                res.end(fs.readFileSync(robotsPath));
                return;
              }
            }
            if (req.url === '/sitemap.xml') {
              const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
              if (fs.existsSync(sitemapPath)) {
                res.setHeader('Content-Type', 'application/xml');
                res.statusCode = 200;
                res.end(fs.readFileSync(sitemapPath));
                return;
              }
            }
            next();
          });

          server.middlewares.use('/api/lead', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const { processContactLead } = await import('./src/api/leadHandler');
                const result = await processContactLead(parsed);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = result.success ? 200 : 400;
                res.end(JSON.stringify(result));
              } catch (err) {
                console.error('Dev server lead error:', err);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(
                  JSON.stringify({
                    success: false,
                    message: 'Internal server error while processing lead.',
                  })
                );
              }
            });
          });

          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const { processChatRequest } = await import('./src/api/chatHandler');
                const reply = await processChatRequest(parsed.messages || []);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ reply }));
              } catch (err) {
                console.error('Dev server chat error:', err);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(
                  JSON.stringify({
                    reply:
                      'Hello! I am Pulse, your Robopulse AI Assistant. How can I help you explore our robotics programs, courses, or school lab setups today?',
                  })
                );
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: [
        { find: /^@\/(.*)/, replacement: path.resolve(__dirname, 'src/$1') },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
      ],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
