import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error('⚠️ Please define the MONGODB_URI in .env.local')
}

interface MongooseCache {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

// Augment the NodeJS global type to include our cached connection
declare global {
  var mongoose: MongooseCache
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null }
}

const cached: MongooseCache = global.mongoose

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongooseInstance) => {
      console.log('✅ Connected to MongoDB')
      return mongooseInstance
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
