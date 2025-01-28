export enum ACTIONS {
  SHARED_CREDENTIALS = "sp-shared-creds",
  PRIVATE_KEY = "sp-private-key"
}

export const SERVER_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://shield-pass-web.vercel.app"