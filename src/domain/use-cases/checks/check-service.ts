import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase{

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ){}

  async execute(url: string):Promise<boolean>{
    try{
      const req = await fetch(url);
      if(!req.ok){
        throw new Error(`Error while checking service ${url}`);
      }

      const okLog = new LogEntity({
        message: `Service: ${ url } is healthy`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts'
      });

      this.logRepository.saveLog(okLog);
      this.successCallback && this.successCallback();
      return true;
    }catch(error){
      const errorMessage = `${ url } is not ok: ${ error }`;
      const errorLog = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts'
      });
      
      this.logRepository.saveLog(errorLog);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
