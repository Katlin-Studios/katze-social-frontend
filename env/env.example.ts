// EXAMPLE OF ENVIRONMENT VARIABLES
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra;

export const API_URL = extra?.API_URL
    ?? "http://localhost:4000";

export const IMAGES_URL = extra?.IMAGES_URL
    ?? "http://localhost:4000/images-bucket";

export const STATUS_URL = extra?.STATUS_URL
    ?? "http://localhost:4000/health";