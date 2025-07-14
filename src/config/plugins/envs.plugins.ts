import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  DEFAULT_RECEIVER_EMAIL: env.get('DEFAULT_RECEIVER_EMAIL').required().asString(),
  PROD: env.get('PROD').required().asBool(),
  MONGO_URL: env.get('MONGO_URL').required().asString()
}
