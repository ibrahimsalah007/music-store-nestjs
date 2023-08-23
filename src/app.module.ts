import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';
import { LoggerModule } from 'nestjs-pino';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { TypeOrmConfigService } from './core/database';
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

import { CoreModule } from './core/core.module';
import { environmentVariablesSchema } from './core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentVariablesSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return addTransactionalDataSource(dataSource);
      },
    }),
    AuthModule,
    UserModule,
    CoreModule,
  ],
  controllers: [],
})
export class AppModule {}
