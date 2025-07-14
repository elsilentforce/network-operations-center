import { envs } from './envs.plugins';

describe('envs.plugin.ts', () => {
  it('returns default env options', () => {
    expect(envs).toEqual({
      PORT: 3001,
      MAILER_EMAIL: 'testmailer@testing.com',
      MAILER_SECRET_KEY: 'placeholder',
      MAILER_SERVICE: 'gmail',
      DEFAULT_RECEIVER_EMAIL: 'sender@email.com',
      PROD: false,
      MONGO_URL: "mongodb://test_mongo_user:123456@localhost:27017/NOC_TEST?authSource=admin"
    });
  });
});
