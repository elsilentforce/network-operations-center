import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDatabase } from './data/mongo';
import { PrismaClient } from './generated/prisma/client';
import { Server } from './presentation/server';

// Server execution start
(async () => {
  main();
})();

async function main(){
  Server.start();
}
