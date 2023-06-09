import { StageEntity } from "../stages/stages.entity";
import { BaseEntity } from "src/utils/baseEntity";
import { Column, Entity, OneToMany} from "typeorm";

@Entity('boards')
export class BoardEntity extends BaseEntity{
    @Column()
    name: string
    @Column({unique: true})
    order: number
    @OneToMany(() => StageEntity, (stage) => stage.board, {cascade: true})
    stages: StageEntity[]
    constructor(board?: Partial<BoardEntity>){
        super()
        this.id = board?.id
        this.createdAt = board?.createdAt
        this.name = board?.name
        this.order = board?.order
        this.stages = board?.stages
        this.updatedAt = board?.updatedAt
    }
}