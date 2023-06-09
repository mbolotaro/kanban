import { StageEntity } from "../stages/stages.entity";
import { BaseEntity } from "src/utils/baseEntity";
export declare class TaskEntity extends BaseEntity {
    name: string;
    desc?: string;
    stageId: number;
    stage: StageEntity;
    order: number;
}
