import { StageEntity } from "../../stages/entities/stage.entity";
import { BaseEntity } from "src/utils/base-entity";
export declare class BoardEntity extends BaseEntity {
    name: string;
    order: number;
    stages: StageEntity[];
    constructor(board?: Partial<BoardEntity>);
}
