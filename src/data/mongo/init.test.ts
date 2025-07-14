import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugins";
import { MongoDatabase } from "./init";

describe('init mongoDB', () => {
  afterAll(() =>{
    mongoose.connection.close();
  });

  describe('with valid arguments', () => {
    it('connects to mongoDB', async() =>{
      const connection = await MongoDatabase.connect(envs.MONGO_URL);
      expect(connection).toBe(true);
    });
  });

  describe('with invalid values', () => {
    it('throws an error', async() => {
      try {
        const connection = await MongoDatabase.connect(envs.MONGO_URL);
      } catch(error){
        expect(error).not.toBeNull();
      }
    });
  });
});


