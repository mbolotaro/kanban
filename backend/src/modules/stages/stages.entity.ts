import { BoardEntity } from "../boards/boards.entity";
import { TaskEntity } from "../tasks/tasks.entity";
import { BaseEntity } from "src/utils/baseEntity";
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity('stages')
export class StageEntity extends BaseEntity{
    @Column()
    name: string
    @Column({unique: true})
    order: number
    @Column({name: 'board_id'})
    boardId: number
    @ManyToOne(()=> BoardEntity, (board) => board.stages)
    @JoinColumn({
        name: 'board_id',
        referencedColumnName: 'id'
    })
    board: BoardEntity
    @OneToMany(()=> TaskEntity, (task) => task.stage)
    tasks: TaskEntity[]
}