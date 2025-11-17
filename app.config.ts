import { ExpoConfig } from "expo/config";

// In SDK 46 and lower, use the following import instead:
// import { ExpoConfig } from '@expo/config-types';

const config: ExpoConfig = {
    name: "Katze Social",
    slug: "katze-social-frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    newArchEnabled: true,
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
        "**/*"
    ],
    androidNavigationBar: {
        barStyle: "light-content",
        backgroundColor: "#0D0B12"
    },
    extra: {
        API_URL: process.env.API_URL,
        IMAGES_URL: process.env.IMAGES_URL || 'https://localhost:4000/images-bucket',
        STATUS_URL: process.env.STATUS_URL || 'https://localhost:4000/health',
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    ios: {
        bundleIdentifier: "app.katze.social",
        supportsTablet: true,
        associatedDomains: ["applinks:katzesocial.app"], // REVIEW WHEN DOMAIN IS FINALIZED
        appStoreUrl: "https://apps.apple.com/app/katze-social/id6441234567", // REVIEW WHEN PUBLISHED
        infoPlist: {
            NSCameraUsageDescription: "This app uses the camera to let you take photos and videos to share with your friends.",
            NSPhotoLibraryUsageDescription: "This app needs access to your photo library to let you choose photos and videos to share with your friends.",
            NSPhotoLibraryAddUsageDescription: "This app needs permission to save photos and videos to your photo library.",
            NSMicrophoneUsageDescription: "This app uses the microphone to record audio for videos and audio files you create to share with your friends."
        },
    },
    android: {
        googleServicesFile: "./google-services.json",
        package: "app.katze.social",
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#0D0B12"
        },
        intentFilters: [
            {
                action: "VIEW",
                autoVerify: true,
                data: [
                    {
                        scheme: "https",
                        host: "get.katzesocial.app"
                    }
                ],
                category: [
                    "BROWSABLE",
                    "DEFAULT"
                ]
            }
        ],
        playStoreUrl: "https://play.google.com/store/apps/details?id=app.katze.social", // REVIEW WHEN PUBLISHED
        blockedPermissions: [
            "android.permission.ACCESS_BACKGROUND_LOCATION",
            "android.permission.READ_MEDIA_VIDEOS",
            "android.permission.READ_MEDIA_IMAGES",
        ],
    },
    plugins: [
        "expo-image-picker",
        "expo-secure-store",
        [
            "expo-notifications",
            {
                "icon": "./assets/notification-icon.png",
                "color": "#0D0B12",
                "sounds": [
                    "./assets/notification-sound.wav"
                ]
            }
        ],
        [
            "expo-splash-screen",
            {
                backgroundColor: "#0D0B12",
                image: "./assets/splash.png",
                imageWidth: 300
            }
        ]
    ]
}

export default config;