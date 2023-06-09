import { BoardEntity } from "../../boards/entities/boards.entity";
import { TaskEntity } from "../../tasks/entities/task.entity";
import { BaseEntity } from "src/utils/base-entity";
export declare class StageEntity extends BaseEntity {
    name: string;
    order: number;
    boardId: number;
    board: BoardEntity;
    tasks: TaskEntity[];
}
