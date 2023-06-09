import { Module } from '@nestjs/common';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StageEntity } from './entities/stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StageEntity])],
  controllers: [StagesController],
  providers: [StagesService]
})
export class StagesModule {}
