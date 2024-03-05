import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.encostay.thisrupt',
  appName: 'Encostay',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  }
};

export default config;
