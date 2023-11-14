import { DataSource, DataSourceOptions } from "typeorm";
import { Config } from "../config/env.config";
import * as mysql2 from 'mysql2';

const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    ...Config,
    ...(Config.type == 'mysql' && {driver: mysql2})
  };
  export const AppDataSource = new DataSource(dataSourceOptions);