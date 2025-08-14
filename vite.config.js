import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
   VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['Qmever.png', 'sitemap.xml', 'robots.txt'],
  manifest: {
    name: 'Qmever',
    short_name: 'Qmever',
    description: 'A stylish shopping experience!',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    scope: '/',
    icons: [
      {
        src: '/Qmever.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Qmever.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
}),

   
  ],
});
