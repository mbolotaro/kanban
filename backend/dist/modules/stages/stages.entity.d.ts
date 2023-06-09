import { BoardEntity } from "../boards/boards.entity";
import { TaskEntity } from "../tasks/tasks.entity";
import { BaseEntity } from "src/utils/baseEntity";
export declare class StageEntity extends BaseEntity {
    name: string;
    order: number;
    boardId: number;
    board: BoardEntity;
    tasks: TaskEntity[];
}
