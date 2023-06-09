import { StageEntity } from "../../stages/entities/stages.entity";
import { BaseEntity } from "src/utils/baseEntity";
export declare class TaskEntity extends BaseEntity {
    name: string;
    desc?: string;
    stageId: number;
    order: number;
    stage: StageEntity;
}
