import { BoardEntity } from "../../boards/entities/boards.entity";
import { TaskEntity } from "../../tasks/entities/task.entity";
import { BaseEntity } from "src/utils/base-entity";
export declare class StageEntity extends BaseEntity {
    name: string;
    order: number;
    boardId: number;
    color: string;
    board: BoardEntity;
    tasks: TaskEntity[];
    constructor(dataStage?: Partial<StageEntity>);
}
