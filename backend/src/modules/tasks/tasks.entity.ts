import { StageEntity } from "../stages/stages.entity";
import { BaseEntity } from "src/utils/baseEntity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('tasks')
export class TaskEntity extends BaseEntity{
    @Column()
    name: string
    @Column({nullable: true})
    desc?: string
    @Column({name: 'stage_id'})
    stageId: number
    @ManyToOne(()=> StageEntity, (stage) => stage.tasks)
    @JoinColumn({
        name: 'stage_id',
        referencedColumnName: 'id'
    })
    stage: StageEntity
    @Column({unique: true})
    order: number
}