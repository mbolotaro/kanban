import { Module } from '@nestjs/common';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageEntity } from './entities/stages.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([StageEntity]), TasksModule],
  controllers: [StagesController],
  providers: [StagesService],
  exports: [StagesService]
})
export class StagesModule {}
