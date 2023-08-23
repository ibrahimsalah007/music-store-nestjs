import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

/**
 * Custom Data source configuration for typeorm migrations
 */
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/core/database/migration/*.js'],
  migrationsTableName: 'typeorm_migrations',
  logger: 'advanced-console',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
