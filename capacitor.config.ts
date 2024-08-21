import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'HFile Depot Mobile',
  webDir: 'dist',
  android: {
    path: 'android',
  },
  server: {
    'hostname': 'localhost',
    'androidScheme': 'https',
    'allowNavigation': [
      'https://mab-solutions.online/api'
    ]
  }
};

export default config;
