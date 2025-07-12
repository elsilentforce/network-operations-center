import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";


describe('CheckService', () =>{
  const mockRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn()
    }
  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

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

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns successCallback', async() => {
      const checkService = new CheckService(mockRepository, mockSuccessCallback, mockErrorCallback);
      const serviceAvailable = await checkService.execute('www.test-url.com');
      
      expect(serviceAvailable).toBe(true);
      expect(mockSuccessCallback).toHaveBeenCalled();
      expect(mockErrorCallback).not.toHaveBeenCalled();

      expect(mockRepository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );
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

    it('retruns the errorCallback', async () => {
      const checkService = new CheckService(mockRepository, mockSuccessCallback, mockErrorCallback);
      const serviceAvailable = await checkService.execute('www.test-url.com');
      
      expect(serviceAvailable).toBe(false);
      expect(mockErrorCallback).toHaveBeenCalled();
      expect(mockSuccessCallback).not.toHaveBeenCalled();

      expect(mockRepository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );  
    });
  });
});
