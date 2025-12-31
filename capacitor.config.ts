import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.resinkra.app',
  appName: 'Resinkra',
  webDir: 'dist',
  server: {
    url: 'https://d9766493-319f-4158-82d6-caca99a7199a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
