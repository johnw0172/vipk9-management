// Direct database storage - connects to where your data actually lives
import { storage as databaseStorage, IStorage } from "./storage-database";

// Export the database storage as the primary storage system
export const storage = databaseStorage;
export type { IStorage };