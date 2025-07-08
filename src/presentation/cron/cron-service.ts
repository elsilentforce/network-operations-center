import { CronJob } from 'cron';

type CronType = string | Date;
type OnTick = () => void; 

export class CronService {
  static createJob( cronTime: CronType, onTick: OnTick ): CronJob{
    const job = new CronJob( cronTime, onTick );
    job.start();
    return job;
  }
}
