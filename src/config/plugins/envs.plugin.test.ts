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
      MONGO_HOST: 'localhost:27017',
      MONGO_DB_NAME: 'NOC_TEST',
      MONGO_USER: 'test_mongo_user',
      MONGO_PASSWORD: '123456'
    });
  });
});
