import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TuitsModule } from './modules/tuits/tuits.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TuitsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,  // models will be loaded automatically
      synchronize: false,  // only in development, to make changes in real time in the db
      // entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    }),
  ],
})

export class AppModule {}
