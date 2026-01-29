import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.resinkra.app',
  appName: 'Resinkra',
  webDir: 'dist',
  server: {
    url: 'https://resinkra.com.br?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
