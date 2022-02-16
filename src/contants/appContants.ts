export const API_URL = process.env.REACT_APP_API_URL

export const FIREBASE_ENV = process.env.REACT_APP_FIREBASE_ENV
export const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
export const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
export const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
export const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
export const FIREBASE_DATABASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL
export const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
export const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
export const FIREBASE_MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
export const VERSION_API = process.env.REACT_APP_VERSION_API


export const FIREBASE_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  ...(FIREBASE_MEASUREMENT_ID ? { measurementId: FIREBASE_MEASUREMENT_ID } : {}), // measurementId is optional
}

export const TOKEN_ID = 'TOKEN_ID'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const heroesClassName = ['Assassin', 'Slayer', 'Warlord', 'Elderwood', 'Hunter', 'Warlock', 'Duelist', 'Wizard', 'Enlightened', 'Fortune']
export const heroesOriginName = ['Brawler', 'Vanguard', 'Ninja', 'Dragon Soul', 'Divine', 'Reviver', 'Dazzler', 'Mystic', 'Guardian', 'Fabled']

export enum TYPE_LINK_WALLET {
  SUCCESS = "Successful",
  WalletAlreadyLink = "Your game account or wallet address is already linked, Please change your account or wallet address.",
  LinkWalletFail = "An error occurred. Please try again later."
}