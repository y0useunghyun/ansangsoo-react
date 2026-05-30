import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const isCI = !!process.env.CI;
const repoBase = '/ansangsoo-react/';
const base = isCI ? repoBase : '/';

// Vite 8 한글 파일명 서빙 버그 우회
function unicodePublicPlugin() {
  return {
    name: 'unicode-public',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          const decoded = decodeURIComponent(req.url.split('?')[0])
          const publicFile = path.join(process.cwd(), 'public', decoded)
          if (fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()) {
            const ext = path.extname(publicFile).toLowerCase()
            const types = { '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.gif':'image/gif' }
            res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
            fs.createReadStream(publicFile).pipe(res)
            return
          }
        } catch {}
        next()
      })
    }
  }
}

// 빌드 시 하드코딩된 /image/ 경로를 base 경로로 일괄 치환
function fixPublicImagePaths() {
  return {
    name: 'fix-public-image-paths',
    apply: 'build',
    generateBundle(_, bundle) {
      if (!isCI) return;
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk') {
          chunk.code = chunk.code.replace(/\/image\//g, `${repoBase}image/`);
        }
      }
    }
  }
}

export default defineConfig({
  base,
  plugins: [react(), unicodePublicPlugin(), fixPublicImagePaths()],
})
