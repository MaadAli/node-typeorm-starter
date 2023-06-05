import Joi from 'joi';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().allow('dev', 'prod', 'test').default('dev'),
  PORT: Joi.number().default(3000),
  PGHOST: Joi.string().required(),
  PGDATABASE: Joi.string().required(),
  PGUSER: Joi.string().required(),
  PGPASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXP: Joi.string().required()

})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}


type configDto = {
  env: string;
  port: string,
  host: string,
  database: string,
  dbUser: string,
  dbPassword: string,
  jwtSecret: string,
  jwtExp: string,
} 
const config: configDto = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  host: envVars.PGHOST,
  database: envVars.PGDATABASE,
  dbUser: envVars.PGUSER,
  dbPassword: envVars.PGPASSWORD,
  jwtSecret: envVars.JWT_SECRET,
  jwtExp: envVars.JWT_EXP

};

console.log('config', config);

export default config;
