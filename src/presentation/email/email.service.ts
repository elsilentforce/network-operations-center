import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[]
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  constructor(
  ){}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });

  async sendEmail(options: SendEmailOptions):Promise<boolean>{
    const { to, subject, htmlBody, attachments = [] } = options;

    try{
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments
      });

      const emailSentLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email successfuly sent',
        origin: 'email.service.ts'
      });

      return true;
    }catch(error){
      const emailFailureLog = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Error sending email',
        origin: 'email.service.ts'
      });
      return false;
    }
  }

  sendEmailWithSystemLogs( to: string | string[] ){
    const subject = 'Server Logs';
    const htmlBody = `
        <h3>NOC Report</h3>
        <p>This is working, you are awesome!!!!
      `
    const attachments:Attachment[] = [
      {filename: 'logs-general.log', path: './logs/logs-general.log'}
    ];

    console.log('Sending email...');
    return this.sendEmail({
      to, subject, htmlBody, attachments
    });
  }
}
