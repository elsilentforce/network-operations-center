import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('LogEntity', () => {
  const validLogObject = {
    message: 'test-message',
    level: LogSeverityLevel.medium,
    origin: 'log.entity.test.ts'
  }

  describe('with valid params', () => {
    const log = new LogEntity(validLogObject);

    it('creates an instance', () => {
      expect(log).toBeInstanceOf(LogEntity);
    });
  
    it('auto assign the createdAt date when it is not provided', () => {
      expect(log.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('.fromJSON', () => {
    describe('with valid params', () => {
      const jsonString = `{"message":"Service is ok","level":"low","createdAt":"2025-07-11T03:47:15.009Z","origin":"check-service.ts"}`;
      const logFromJson = LogEntity.fromJSON(jsonString);
      
      it('creates an instance with a given JSON string', () => {
        expect(logFromJson).toBeInstanceOf(LogEntity);
      });

      it('parses createdAt date as object from given string', () => {
        expect(logFromJson.createdAt).toBeInstanceOf(Date);
      });
    });
  });

  describe('.fromObject', () => {
    describe('with valid params', () => {
      const logFromObject = LogEntity.fromObject(validLogObject);
      expect(logFromObject).toBeInstanceOf(LogEntity);
    });
  });
});
