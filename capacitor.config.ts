import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alwazir.optics',
  appName: 'الوزير للبصريات',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Uncomment the next line if you want to test on the phone while running 'npm run dev' on PC (replace IP)
    // url: 'http://192.168.1.X:5173', 
    // cleartext: true
  },
  plugins: {
    // Configuration for permissions if needed
  }
};

export default config;