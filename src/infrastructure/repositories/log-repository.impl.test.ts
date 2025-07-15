import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogRepositoryImplementation } from "./log-repository.impl";



describe('LogRepositoryImplementation', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockLogRepository = new LogRepositoryImplementation(mockLogDatasource);
  const mockLog = { level: LogSeverityLevel.low, message: 'test-msg' } as LogEntity;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('.saveLog', () => {
    it('calls the datasource with arguments', async() => {
      await mockLogRepository.saveLog(mockLog);
      expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(mockLog);
    });
  });

  describe('.getLogs', () => {
    it('calls the datasource with arguments', async() => {
      const lowSeverity =  LogSeverityLevel.low;
      await mockLogRepository.getLogs(lowSeverity);
      expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity);
    });
  });
});
