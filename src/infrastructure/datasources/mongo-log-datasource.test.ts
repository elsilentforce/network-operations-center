import mongoose from "mongoose";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { envs } from "../../config/plugins/envs.plugins";
import { LogDatasource } from "../../domain/datasources/log.datasource";

afterEach(async()=>{
  await LogModel.deleteMany();
});

afterAll(() => {
  mongoose.connection.close();
});

const testLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message',
        origin: 'mongo-log-datasourse.tests.ts'
      });
const mongoLogDatasource = new MongoLogDatasource();

describe('MongoLogDataSource', () => {
  beforeAll(() => {
    MongoDatabase.connect(envs.MONGO_URL);
  });

  it('creates a Log', async() => {
    
    const logSpy = jest.spyOn(console, 'log');

    await mongoLogDatasource.saveLog(testLog);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      expect.any(Date),
      "Mongo Log created:",
      expect.any(String)
    );
  });

  it('get Logs', async() => {
    await mongoLogDatasource.saveLog(testLog);
    const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.low);
    expect(logs.length).toBe(1);
  });
});
