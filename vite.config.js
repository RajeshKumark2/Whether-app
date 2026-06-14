import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    configureServer(server) {
      // Endpoint 1: Gemini Chat Client Forwarder
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next();
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body);
            const userPrompt = parsed.prompt || 'Hello';
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured in secrets.' }));
              return;
            }

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{ text: userPrompt }]
                }]
              })
            });

            const data = await response.json();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });

      // Endpoint 2: Sync to disk (saves Kotlin code and updates Platform metadata/strings)
      server.middlewares.use('/api/save-source', (req, res, next) => {
        if (req.path !== '/api/save-source' && req.url !== '/api/save-source') {
          return next();
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            const { code, appName } = parsed;

            if (!code || !appName) {
              res.statusCode = 400;
              res.end('Missing code or appName parameter');
              return;
            }

            // 1. Write MainActivity.kt
            const kotlinPath = '/app/src/main/java/com/example/MainActivity.kt';
            fs.writeFileSync(kotlinPath, code, 'utf8');

            // 2. Synchronize strings.xml
            const stringsPath = '/app/src/main/res/values/strings.xml';
            const updatedStrings = `<resources>\n    <string name="app_name">${appName}</string>\n</resources>\n`;
            fs.writeFileSync(stringsPath, updatedStrings, 'utf8');

            // 3. Synchronize metadata.json
            const metadataPath = '/metadata.json';
            let metadata = { name: appName, description: `Jetpack Compose app mockup generated for ${appName}`, requestFramePermissions: [], majorCapabilities: ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"] };
            if (fs.existsSync(metadataPath)) {
              try {
                const currentMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
                metadata = { ...currentMeta, name: appName, description: `Jetpack Compose app mockup generated for ${appName}` };
              } catch (e) {
                // ignore and use fallback
              }
            }
            fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'MainActivity.kt, strings.xml, and metadata.json updated on disk successfully.' }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    }
  },
});
