import { StageEntity } from "../../stages/entities/stage.entity";
import { BaseEntity } from "src/utils/base-entity";
export declare class TaskEntity extends BaseEntity {
    name: string;
    desc?: string;
    stageId: number;
    order: number;
    stage: StageEntity;
    constructor(dataTask?: Partial<TaskEntity>);
}
