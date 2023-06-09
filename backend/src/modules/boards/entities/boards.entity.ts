import { StageEntity } from "../../stages/entities/stage.entity";
import { BaseEntity } from "src/utils/base-entity";
import { Column, Entity, OneToMany} from "typeorm";
import {ApiProperty} from '@nestjs/swagger'

@Entity('boards')
export class BoardEntity extends BaseEntity{
    @Column()
    @ApiProperty()
    name: string

    @Column({unique: true})
    @ApiProperty()
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