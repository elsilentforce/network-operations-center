import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugins";
import { MongoDatabase } from "./init";

describe('init mongoDB', () => {
  afterAll(() =>{
    mongoose.connection.close();
  });

  describe('with valid arguments', () => {
    it('connects to mongoDB', async() =>{
      const connection = await MongoDatabase.connect({
        mongoHost: envs.MONGO_HOST,
        mongoUser: envs.MONGO_USER,
        mongoPassword: envs.MONGO_PASSWORD,
        dbName: envs.MONGO_DB_NAME,
      });
      expect(connection).toBe(true);
    });
  });

  describe('with invalid values', () => {
    it('throws an error', async() => {
      try {
        const connection = await MongoDatabase.connect({
          mongoHost: envs.MONGO_HOST,
          mongoUser: 'h4x',
          mongoPassword: 'admin123',
          dbName: envs.MONGO_DB_NAME,
        });
      } catch(error){
        expect(error).not.toBeNull();
      }
    });
  });
});


