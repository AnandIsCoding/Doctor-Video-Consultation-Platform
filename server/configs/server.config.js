import dotenv from 'dotenv'
dotenv.config()

// This file contains the server configuration settings
// It reads environment variables from the .env file
export const PORT = process.env.PORT
export const DATABASE_URL = process.env.DATABASE_URL

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : []

// Ensure that the required environment variables are set
if (!PORT) {
  throw new Error('PORT is not defined in the environment variables')
}
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables')
}

//  jwt credentials

export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPERY = process.env.JWT_EXPERY || '7d'


//  google login credentials


export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET
export const GOOGLE_CALLBACK_URL= process.env.GOOGLE_CALLBACK_URL

if (!GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not defined in the environment variables')
}
if (!GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET is not defined in the environment variables')
}
if (!GOOGLE_CALLBACK_URL) {
  throw new Error('GOOGLE_CALLBACK_URL is not defined in the environment variables')
}