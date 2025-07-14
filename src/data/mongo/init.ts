import mongoose from "mongoose";

export class MongoDatabase {
  static async connect(mongoUrl: string){
    try{
      await mongoose.connect(mongoUrl);
      return true;
    }catch(error){
      throw error;
     }
  }
}
