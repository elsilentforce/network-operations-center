import { envs } from "../config/plugins/envs.plugins";
import { FileSystemDataSource } from "../domain/datasources/file-system.datasource";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImplementation } from "../infrastructure/repository/log-repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImplementation(
  new FileSystemDataSource()
);

export class Server {
  static start(){
    console.log('Server started...');
    this.sendLogFilesByEmail( envs.DEFAULT_RECEIVER_EMAIL );
  }

  static checkLocalApi = () => {
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

  static sendTestEmail = () => {
    const emailService = new EmailService(fileSystemLogRepository);
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
    const emailService = new EmailService(fileSystemLogRepository);
    emailService.sendEmailWithSystemLogs(to);
  }
}
