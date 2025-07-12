import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('CheckServiceMultiple', () => {
  const mockFsRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockMongoRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockPostgresRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();
  
  const checkServiceMultiple = new CheckServiceMultiple(
    [ mockFsRepository, mockMongoRepository, mockPostgresRepository ],
    mockSuccessCallback,
    mockErrorCallback
  );

  describe('when service status is ok', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ status: 'OK' }),
          ok: true,
          status: 200
        }),
      ) as jest.Mock;
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    describe('with FS repository', () => {
      it('creates a log entry in MongoDB', async () => {
        const serviceAvailable = await checkServiceMultiple.execute('www.test-url.com');
        expect(mockSuccessCallback).toHaveBeenCalled();
        expect(mockErrorCallback).not.toHaveBeenCalled();

        expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(
          expect.any(LogEntity)
        );
      });
    });

    describe('with MongoDB repository', () => {
      it('creates a log entry in MongoDB', async () => {
        const serviceAvailable = await checkServiceMultiple.execute('www.test-url.com');
        expect(mockSuccessCallback).toHaveBeenCalled();
        expect(mockErrorCallback).not.toHaveBeenCalled();

        expect(mockFsRepository.saveLog).toHaveBeenCalledWith(
          expect.any(LogEntity)
        );
      });
    });

    describe('with Postgres repository', () => {
      it('creates a log entry in MongoDB', async () => {
        const serviceAvailable = await checkServiceMultiple.execute('www.test-url.com');
        expect(mockSuccessCallback).toHaveBeenCalled();
        expect(mockErrorCallback).not.toHaveBeenCalled();

        expect(mockPostgresRepository.saveLog).toHaveBeenCalledWith(
          expect.any(LogEntity)
        );
      });
    });
  });

  describe('when service status is not ok', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ status: 'ERROR' }),
          ok: false,
          status: 401
        }),
      ) as jest.Mock;
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    describe('with FS repository', () => {
      it('creates a log entry in MongoDB', async () => {
        const serviceAvailable = await checkServiceMultiple.execute('www.test-url.com');
        expect(mockErrorCallback).toHaveBeenCalled();
        expect(mockSuccessCallback).not.toHaveBeenCalled();

        expect(mockMongoRepository.saveLog).toHaveBeenCalledWith(
          expect.any(LogEntity)
        );
      });
    });

    describe('with MongoDB repository', () => {
      it('creates a log entry in MongoDB', async () => {
        const serviceAvailable = await checkServiceMultiple.execute('www.test-url.com');
        expect(mockErrorCallback).toHaveBeenCalled();
        expect(mockSuccessCallback).not.toHaveBeenCalled();

        expect(mockFsRepository.saveLog).toHaveBeenCalledWith(
          expect.any(LogEntity)
        );
      });
    });

    describe('with Postgres repository', () => {
      it('creates a log entry in MongoDB', async () => {
        const serviceAvailable = await checkServiceMultiple.execute('www.test-url.com');
        expect(mockErrorCallback).toHaveBeenCalled();
        expect(mockSuccessCallback).not.toHaveBeenCalled();

        expect(mockPostgresRepository.saveLog).toHaveBeenCalledWith(
          expect.any(LogEntity)
        );
      });
    });
  });
});
