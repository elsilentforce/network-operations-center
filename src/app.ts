import { envs } from './config/plugins/envs.plugins';
import { Server } from './presentation/server';

// Server execution start
(async () => {
  main();
})();

function main(){
  Server.start();
}
