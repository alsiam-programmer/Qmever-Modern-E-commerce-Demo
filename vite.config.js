import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon-16x16.png',
        'favicon-32x32.png',
        'apple-touch-icon.png',
        'Qmever.png',
        'sitemap.xml',
        'robots.txt'
      ],
      manifest: {
        name: 'Qmever',
        short_name: 'Qmever',
        description: 'A stylish shopping experience!',
        theme_color: '#062919',          // ✅ Top & bottom bars color
        background_color: '#ffffff',     // ✅ Splash screen color
        display: 'standalone',           // ✅ Fullscreen like an app
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});