import { CronService } from "./cron-service";

describe('CronService', () => {
  describe('createJob', () => {
    const mockTick = jest.fn();
    
    it('creates a job', (done) => {
      const job = CronService.createJob('* * * * * *', mockTick);

      setTimeout(() => {
        job.stop();
        expect(mockTick).toHaveBeenCalledTimes(2);
        done();
      }, 2000);
    }, 2100);

  });
});
