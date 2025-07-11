import mongoose from "mongoose";

interface ConnectionOptions {
  mongoHost: string;
  mongoUser: string;
  mongoPassword: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions){
    const { mongoHost, dbName, mongoUser, mongoPassword } = options;

    const conString =
      `mongodb://${ mongoUser }:${ mongoPassword }@${ mongoHost }/${ dbName }?authSource=admin`;

    try{
      await mongoose.connect(conString);
      return true;
    }catch(error){
      console.log('Mongo connection error');
      throw error;
     }
  }
}
