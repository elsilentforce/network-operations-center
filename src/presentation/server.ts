import { envs } from "../config/plugins/envs.plugins";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { CheckService } from "../domain/use-cases/checks/check-service";
import SendEmailLogs from "../domain/use-cases/email/email-send-logs";
import { LogRepositoryImplementation } from "../infrastructure/repository/log-repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";

const logRepository = new LogRepositoryImplementation(
  // new FileSystemDataSource()
  new MongoLogDatasource()
);

export class Server {
  static start(){
    console.log('Server started...');
    // Uncomment this to send logs by email
    // this.sendLogFilesByEmail( envs.DEFAULT_RECEIVER_EMAIL );
    this.checkLocalApi();
  }

  static checkLocalApi = () => {
    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://localhost:3000/posts';
        new CheckService(
          logRepository,
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
