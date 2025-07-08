import { FileSystemDataSource } from "../domain/datasources/file-system.datasource";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImplementation } from "../infrastructure/repository/log-repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

export class Server {
  static start(){
    console.log('Server started...');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://localhost:3000/posts';
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${ url } OK`),
          ( error ) => console.log( error )
        ).execute( url );
      }
    );

  }
}
