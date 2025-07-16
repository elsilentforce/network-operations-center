import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from "./email.service";

describe('EmailService', () =>{
  const mockSendMail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });
  const emailService = new EmailService();
  const sendOptions: SendEmailOptions = {
    to: 'foo@bar.com',
    subject: 'Test',
    htmlBody: '<h1>Test</h1>'
  }

  describe('.sendEmail', () =>{
    it('triggers an email', async () =>{
      await emailService.sendEmail(sendOptions);
      expect(mockSendMail).toHaveBeenCalledWith({
        "attachments": expect.any(Array),
        "html": "<h1>Test</h1>",
        "subject": "Test",
        "to": "foo@bar.com"
      });
    });

    it('sends email with attachments', async () => {
      const testReceiverEmail = 'foo@bar.com';
      await emailService.sendEmailWithSystemLogs(testReceiverEmail);
      expect(mockSendMail).toHaveBeenCalledWith({
        to: testReceiverEmail,
        subject: "Server Logs",
        html: expect.any(String),
        attachments: expect.arrayContaining([
          {filename: 'logs-general.log', path: './logs/logs-general.log'}
        ])
      });
    });
  });
});