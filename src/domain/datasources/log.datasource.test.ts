import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

describe('LogDataSource', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-message',
    level: LogSeverityLevel.low
  });

  class MockLogDataSource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [];
    }
  }

  it('returns functions from abstract class', () => {
    const mockLogDataSource = new MockLogDataSource();
    expect( mockLogDataSource ).toBeInstanceOf( MockLogDataSource );
    expect( typeof mockLogDataSource.saveLog ).toBe('function');
    expect( typeof mockLogDataSource.getLogs ).toBe( 'function' );
  });
});
