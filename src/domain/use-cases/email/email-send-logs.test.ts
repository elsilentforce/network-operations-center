import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import SendEmailLogs from "./email-send-logs";

describe('SendEmailLogs', () => {
  const mockEmailService = {
    sendEmailWithSystemLogs: jest.fn().mockReturnValue(true)
  }
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  describe('.execute', () => {
    beforeEach(()=>{
      jest.clearAllMocks();
    });

    describe('when email is sent', () => {
      it('saves a new successful log at LogRepository', async () => {
        const result = await sendEmailLogs.execute('foo');
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity) );
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
          createdAt: expect.any(Date),
          level: "medium",
          message: "Log report sent to: foo",
          origin: "email-send-logs.ts",
        });
      });

      it('returns true', async () => {
        const result = await sendEmailLogs.execute('foo');
        expect(mockEmailService.sendEmailWithSystemLogs).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
      });
    });

    describe('when email is not sent', () => {
      beforeEach(() => {
        mockEmailService.sendEmailWithSystemLogs.mockReturnValue(false);
      });

      it('saves a new error log at LogRepository', async () => {
        const result = await sendEmailLogs.execute('foo');
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith( expect.any(LogEntity) );
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
          createdAt: expect.any(Date),
          level: "high",
          message: "Error: Email log was not sent",
          origin: "email-send-logs.ts",
        });
      });

      it('returns false', async () => {
        const result = await sendEmailLogs.execute('foo');
        expect(result).toBe(false);
      });

    });
  });
});
