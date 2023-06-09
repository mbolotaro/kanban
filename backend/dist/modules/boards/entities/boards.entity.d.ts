import { StageEntity } from "../../stages/entities/stages.entity";
import { BaseEntity } from "src/utils/base-entity";
export declare class BoardEntity extends BaseEntity {
    name: string;
    order: number;
    stages: StageEntity[];
    constructor(board?: Partial<BoardEntity>);
}
