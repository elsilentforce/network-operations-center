import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";


describe('CheckService', () =>{
  describe('when fetch returns true', () => {
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

    const mockRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn()
    }
    const mockSuccessCallback = jest.fn();
    const mockErrorCallback = jest.fn();
    
    it('returns successCallback', async() => {
      const checkService = new CheckService(mockRepository, mockSuccessCallback, mockErrorCallback);
      const okCheck = await checkService.execute('www.test-url.com'); // TODO: Replace with a mock response
      
      expect(okCheck).toBe(true);
      expect(mockSuccessCallback).toHaveBeenCalled();
      expect(mockErrorCallback).not.toHaveBeenCalled();

      expect(mockRepository.saveLog).toHaveBeenCalledWith(
        expect.any(LogEntity)
      );
    });
  });
});
