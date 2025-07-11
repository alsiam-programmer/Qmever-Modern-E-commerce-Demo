import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // এইটাই service worker কে auto generate ও auto update করে
      includeAssets: ['Qmever.png'],
      manifest: {
        name: 'Qmever',
        short_name: 'Qmever',
        description: 'A stylish shopping experience!',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'Qmever.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
