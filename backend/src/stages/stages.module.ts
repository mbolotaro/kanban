import { Module } from '@nestjs/common';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [StagesController],
  providers: [StagesService]
})
export class StagesModule {}
