import { Collection, MongoClient } from "mongodb";

class MongoHelper {
  private client: MongoClient | null = null;

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/clean-node-api",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();

      this.client = null;
    }
  }

  getCollection(collectionName: string): Collection {
    if (!this.client) {
      throw new Error("MongoDB client not connected.");
    }

    const collection = this.client.db().collection(collectionName);

    if (!collection) {
      throw new Error(`MongoDB collection "${collectionName}" not found.`);
    }

    return collection;
  }
}

const mongoHelper = new MongoHelper();

export { mongoHelper };
