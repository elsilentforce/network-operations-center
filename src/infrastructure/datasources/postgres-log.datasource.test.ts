import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient } from "../../generated/prisma";
import { PostgresLogDataSource } from "./postgres-log.datasource";

describe('PostgresDataSource', () => {
  const prismaClient = new PrismaClient();
  const testLog = new LogEntity({
    message: 'test-message',
    level: LogSeverityLevel.medium,
    origin: 'postgres-log.datasource.test.ts',
  });
  const postgresLogDataSource = new PostgresLogDataSource();

  afterEach(async() => {
    await prismaClient.logModel.deleteMany();
  });

  it('saves a Log', async() => {
    const logSpy = jest.spyOn(console, 'log');
    await postgresLogDataSource.saveLog(testLog);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      expect.any(Date),
      "Log saved to Postgres"
    );
  });

  it('get Logs', async() => {
    await postgresLogDataSource.saveLog(testLog);
    const logs = await postgresLogDataSource.getLogs(LogSeverityLevel.medium);
    expect(logs.length).toBe(1);
  });
});
