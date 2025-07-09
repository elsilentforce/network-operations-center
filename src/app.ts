import { envs } from './config/plugins/envs.plugins';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

// Server execution start
(async () => {
  main();
})();

async function main(){
  // Initialize MongoDB connection
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  });

  Server.start();
}
