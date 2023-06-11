import { BoardEntity } from "../../boards/entities/boards.entity";
import { TaskEntity } from "../../tasks/entities/task.entity";
import { BaseEntity } from "src/utils/base-entity";
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import {ApiProperty} from '@nestjs/swagger'

@Entity('stages')
export class StageEntity extends BaseEntity{
    @Column()
    @ApiProperty()
    name: string

    @Column({unique: true})
    @ApiProperty()
    order: number
    
    @Column({name: 'board_id'})
    @ApiProperty()
    boardId: number

    @ManyToOne(()=> BoardEntity, (board) => board.stages)
    @JoinColumn({
        name: 'board_id',
        referencedColumnName: 'id'
    })
    board: BoardEntity
    
    @OneToMany(()=> TaskEntity, (task) => task.stage, {cascade: true})
    tasks: TaskEntity[]

    constructor(dataStage?: Partial<StageEntity>){
        super()
        this.name = dataStage?.name
        this.id = dataStage?.id
        this.order = dataStage?.order
        this.boardId = dataStage?.boardId
        this.createdAt = dataStage?.createdAt
        this.updatedAt = dataStage?.updatedAt
    }
}