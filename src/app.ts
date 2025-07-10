import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

// Server execution start
(async () => {
  main();
})();

async function main(){
  // Initialize MongoDB connection
  await MongoDatabase.connect({
    mongoHost: envs.MONGO_HOST,
    mongoUser: envs.MONGO_USER,
    mongoPassword: envs.MONGO_PASSWORD,
    dbName: envs.MONGO_DB_NAME
  });
  
  Server.start();
  
  // const newLog = await LogModel.create({
  //   message: 'Test message from Mongo',
  //   origin: 'app.ts',
  //   level: 'low'
  // });

  // await newLog.save();
  // console.log(newLog);

  // const logs = await LogModel.find();
  // console.log(logs);
}
