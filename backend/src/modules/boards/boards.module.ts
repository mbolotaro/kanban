import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './entities/boards.entity';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { StagesModule } from '../stages/stages.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity]), StagesModule, TasksModule],
    controllers: [BoardsController],
    providers: [BoardsService]
})
export class BoardsModule {}
