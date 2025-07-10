import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  DEFAULT_RECEIVER_EMAIL: env.get('DEFAULT_RECEIVER_EMAIL').required().asString(),
  PROD: env.get('PROD').required().asBool(),
  MONGO_HOST: env.get('MONGO_HOST').required().asString(),
  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  MONGO_USER: env.get('MONGO_USER').required().asString(),
  MONGO_PASSWORD: env.get('MONGO_PASSWORD').required().asString(),
}
