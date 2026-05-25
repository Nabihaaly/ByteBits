// Connect app → MongoDB
// Reuse connection if already connected
// Avoid creating too many connections

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and to prevent creating multiple connections in production.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Mongoose | null; //Stores active DB connection.
    promise: Promise<Mongoose> | null; //promise: Stores ongoing connection request.
  } | undefined;
}

let cached = global.mongoose; //connection caching

if (!cached) { //If cache doesn't exist: Create one.
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<Mongoose> {
  if (cached!.conn) { //! : TypeScript non-null assertion operator, 
    return cached!.conn; // If that if statement is true, it immediately returns the already-established, cached connection instead of opening a brand new one.
  }

  if (!cached!.promise) { //No connection request running?, create one
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,                 // Up to 10 concurrent connections
      serverSelectionTimeoutMS: 10000, // 10 sec to find a server
      socketTimeoutMS: 45000,          // 45 sec before killing idle socket
    };

    console.log("Connecting to MongoDB...");

    cached!.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB connected successfully");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        cached!.promise = null; //Failed connection should not stay cached., otherwise Future requests reuse broken promise.
        throw error;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connectDB;
