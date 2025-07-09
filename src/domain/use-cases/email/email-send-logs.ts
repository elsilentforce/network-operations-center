import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export default class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ){}

  async execute(to: string | string[]){
    try{
      const sent = await this.emailService.sendEmailWithSystemLogs(to);
      if(!sent){
        throw new Error('Email log was not sent');
      }
      return true;
    } catch (error){
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'send-email-log.ts'
      });
      return false;
    }
  }
}
