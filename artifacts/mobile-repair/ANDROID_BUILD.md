# Android APK Build Guide
## Rajesh Patidar Mobile Repair

This web app can be packaged as a native Android APK using **Capacitor** (by Ionic).

---

## Step 1 — Install Capacitor (run on your local machine)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Rajesh Patidar Mobile Repair" "com.rajeshpatidar.mobilerepair" --web-dir dist/public
npx cap add android
```

---

## Step 2 — Build the web app

```bash
# Set your Firebase env vars first, then:
pnpm --filter @workspace/mobile-repair run build
```

---

## Step 3 — Sync and open Android Studio

```bash
npx cap sync android
npx cap open android
```

---

## Step 4 — Configure Android project

Edit `android/app/src/main/AndroidManifest.xml` and add:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

---

## Step 5 — Firebase for Android

1. Go to Firebase Console → Project Settings → Add Android app
2. Package name: `com.rajeshpatidar.mobilerepair`
3. Download `google-services.json`
4. Place it in `android/app/google-services.json`
5. Add to `android/app/build.gradle`:
   ```gradle
   apply plugin: 'com.google.gms.google-services'
   ```

---

## Step 6 — Generate APK

In Android Studio:
- **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## capacitor.config.ts (place in project root)

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rajeshpatidar.mobilerepair',
  appName: 'Rajesh Patidar Mobile Repair',
  webDir: 'artifacts/mobile-repair/dist/public',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1d4ed8',
      androidSplashResourceName: 'splash',
      showSpinner: false
    }
  }
};

export default config;
```

---

## App Store Info

| Field | Value |
|-------|-------|
| App Name | Rajesh Patidar Mobile Repair |
| Package ID | com.rajeshpatidar.mobilerepair |
| Version | 1.0.0 |
| Min SDK | Android 6.0 (API 23) |
| Target SDK | Android 14 (API 34) |

---

## Firebase Phone Auth for Android

In Firebase Console:
1. Authentication → Sign-in method → Phone → Enable
2. Add SHA-1 fingerprint of your keystore:
   ```bash
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
3. Paste SHA-1 in Firebase Console → Project Settings → Android app → Add fingerprint
