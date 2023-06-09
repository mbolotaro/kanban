import { StageEntity } from "../stages/stages.entity";
import { BaseEntity } from "src/utils/baseEntity";
export declare class BoardEntity extends BaseEntity {
    name: string;
    order: number;
    stages: StageEntity[];
    constructor(board?: Partial<BoardEntity>);
}
