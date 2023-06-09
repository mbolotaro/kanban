import { BoardEntity } from "src/modules/boards/boards.entity";
import { StageEntity } from "src/modules/stages/stages.entity";
import { TaskEntity } from "src/modules/tasks/tasks.entity";
import { Repository } from "typeorm";
type acceptedEntities = BoardEntity | StageEntity | TaskEntity;
export declare function defineOrderAndSave<T extends acceptedEntities>(entity: T, repository: Repository<T>): Promise<void>;
export declare function updateOrderAndSave<T extends acceptedEntities>(currentOrder: number, newOrder: number, repository: Repository<T>): Promise<void>;
export declare function deleteEntityAndSave<T extends acceptedEntities>(entity: T, repository: Repository<T>): Promise<void>;
export {};
