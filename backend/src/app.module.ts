import { Module } from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_TYPE,
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      synchronized: true
    } as TypeOrmModuleOptions)
  ],
  
})
export class AppModule {}
