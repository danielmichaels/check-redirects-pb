import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  envPrefix: "CR",
  assetsInclude: ['**/*.md'],
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),  ],
})