import { StageEntity } from "../../stages/entities/stages.entity";
import { BaseEntity } from "src/utils/base-entity";
export declare class TaskEntity extends BaseEntity {
    name: string;
    desc?: string;
    stageId: number;
    order: number;
    color: string;
    stage: StageEntity;
    constructor(dataTask?: Partial<TaskEntity>);
}
