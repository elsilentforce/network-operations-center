import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDataSource implements LogDatasource {

  private readonly logPath = `logs/`;
  private readonly generalLogsPath = `logs/logs-general.log`;
  private readonly mediumLogsPath = `logs/logs-medium.log`;
  private readonly highLogsPath = `logs/logs-high.log`;

  constructor(){
    this.createLogsFiles();
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJSON = `${ JSON.stringify(newLog) }\n`;

    fs.appendFileSync(this.generalLogsPath, logAsJSON);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJSON);
    }
    else {
      fs.appendFileSync(this.highLogsPath, logAsJSON);
    }

    console.log(new Date(), 'Log created to FS');
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch(severityLevel){
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.generalLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);   
      default:
        throw new Error(`${ severityLevel } not implemented`);
    }
  }

  private createLogsFiles = () => {
    if ( !fs.existsSync(this.logPath) ){
      fs.mkdirSync(this.logPath);
    }

    [
      this.generalLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach( path => {
      if(fs.existsSync(path)) return;
      fs.writeFileSync(path, '');
    })
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, 'utf-8');
    if (content === '') return [];
    const logs = content.split('\n').map(
      log => LogEntity.fromJSON(log)
    );
    return logs;
  }


}
