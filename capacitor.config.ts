import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.biuedu.sims',
  appName: 'BIUSIMS',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    StatusBar: {
      style: 'dark', // or 'dark' depending on your app's design
      backgroundColor:'#154360', // Replace with your desired color
      "SplashScreen": {
        "launchShowDuration": 5000
      }
    }
  }
  // other configurations...
};

export default config;
