import { EnvConfig } from "../interfaces/env.config.interface";
import { JoiValidationSchema } from "./joi.validation";

export const Config: EnvConfig = {
  type: process.env.DB_TYPE || "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: +process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  ssl: +process.env.SSL >= 1 ? true : false,
};

const { error, value } = JoiValidationSchema.validate(Config);
if (error) {
  console.log('La validación falló:', error.details);
  process.exit(0);
} 
