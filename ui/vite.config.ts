import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  envPrefix: "CR",
  assetsInclude: ['**/*.md'],
  plugins: [
    TanStackRouterVite(),
    viteReact(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
})