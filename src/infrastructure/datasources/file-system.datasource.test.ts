import fs from 'fs';
import path from "path";
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('FileSystemDataSource', () => {
  const logPath = path.join(__dirname, '../../../logs');

  describe('when logs directory does not exist', () => {
    beforeAll(()=>{
      fs.rmSync(logPath, { recursive: true, force: true });
    });

    it('creates the logs files into directory', () => {
      new FileSystemDataSource();
      const files = fs.readdirSync(logPath);
      expect(files).toEqual([ 'logs-general.log', 'logs-high.log', 'logs-medium.log' ]);
    });
  });

  describe('when logs directory exists', () => {
    const fsLogDataSource = new FileSystemDataSource();
    const lowSeverityTestLog = new LogEntity({
      message: 'test-message',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    });
    const mediumSeverityTestLog = new LogEntity({
      message: 'test-message',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    });
    const highSeverityTestLog = new LogEntity({
      message: 'test-message',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    });

    it('saves the low severity logs into logs-general.log file', () => {
      fsLogDataSource.saveLog(lowSeverityTestLog);
      const generalLogs = fs.readFileSync(`${ logPath }/logs-general.log`, 'utf-8');
      expect(generalLogs).toContain(JSON.stringify(lowSeverityTestLog));
    });

    it('saves the medium severity logs into logs-medium.log file', () => {
      fsLogDataSource.saveLog(mediumSeverityTestLog);
      const generalLogs = fs.readFileSync(`${ logPath }/logs-medium.log`, 'utf-8');
      expect(generalLogs).toContain(JSON.stringify(mediumSeverityTestLog));
    });

    it('saves the low severity logs into logs-high.log file', () => {
      fsLogDataSource.saveLog(highSeverityTestLog);
      const generalLogs = fs.readFileSync(`${ logPath }/logs-high.log`, 'utf-8');
      expect(generalLogs).toContain(JSON.stringify(highSeverityTestLog));
    });
  });
});
