import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

import { Environment } from "../common/enum";


export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv = config.get('NODE_ENV') !== Environment.Production;

    const dbConfig = {
      type: 'mysql',
      host: config.get('DB_HOST'),
      port: +config.get('DB_PORT'),
      username: config.get('DB_USERNAME'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      autoLoadEntities: true,  // models will be loaded automatically
      synchronize: isDevelopmentEnv,  // only in development, to make changes in real time in the db
      logging: config.get('DB_LOGGING'),
      // entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    } as DataSourceOptions;

    return dbConfig;
  }
})
