import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function saveContentPlugin(): Plugin {
  return {
    name: 'save-content-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/save-content', (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: any) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const filePath = path.resolve(process.cwd(), 'src/customContent.json')
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true }))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: String(err) }))
            }
          })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), saveContentPlugin()],
})
