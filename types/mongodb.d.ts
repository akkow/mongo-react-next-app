import { MongoClient } from "mongodb"

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
  var gMongoose: { promise: Promise<typeof mongoose>; conn: typeof mongoose };
}
