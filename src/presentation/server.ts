import { envs } from "../config/plugins/envs.plugins";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { CheckService } from "../domain/use-cases/checks/check-service";
import SendEmailLogs from "../domain/use-cases/email/email-send-logs";
import { LogRepositoryImplementation } from "../infrastructure/repository/log-repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { MongoDatabase } from "../data/mongo";

const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDataSource()
);

export class Server {



  static async start(){
    console.log('Server started...');
    
    // Initialize MongoDB connection
     await MongoDatabase.connect({
      mongoHost: envs.MONGO_HOST,
      mongoUser: envs.MONGO_USER,
      mongoPassword: envs.MONGO_PASSWORD,
      dbName: envs.MONGO_DB_NAME
    });
    
    this.checkLocalApi();
  }

  static checkLocalApi = () => {
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://localhost:3000/posts';
        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log(`${ url } OK`),
          ( error ) => console.log( error )
        ).execute( url );
      }
    );
  }

  static sendTestEmail = () => {
    const emailService = new EmailService();
    emailService.sendEmail({
      to: envs.DEFAULT_RECEIVER_EMAIL,
      subject: 'System Logs',
      htmlBody: `
        <h3>NOC Report</h3>
        <p>This is working, you are awesome!!!!
      `
    });
  }

  static sendLogFilesByEmail = (to: string) => {
    const emailService = new EmailService();
    const fileSystemLogRepository = new LogRepositoryImplementation(
      new FileSystemDataSource()
    );

    const emailSender = new SendEmailLogs(
      emailService,
      fileSystemLogRepository
    );
    emailSender.execute(to);
  }
}
