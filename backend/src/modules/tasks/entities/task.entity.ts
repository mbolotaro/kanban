import { StageEntity } from "../../stages/entities/stages.entity";
import { BaseEntity } from "src/utils/base-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ApiProperty } from '@nestjs/swagger'

@Entity('tasks')
export class TaskEntity extends BaseEntity{
    @Column()
    @ApiProperty()
    name: string

    @Column({nullable: true})
    @ApiProperty()
    desc?: string
    
    @Column({name: 'stage_id'})
    @ApiProperty()
    stageId: number
    
    @Column({unique: true})
    @ApiProperty()
    order: number

    @ManyToOne(()=> StageEntity, (stage) => stage.tasks)
    @JoinColumn({
        name: 'stage_id',
        referencedColumnName: 'id'
    })
    stage: StageEntity
    
    constructor(dataTask?: Partial<TaskEntity>){
        super()
        this.name = dataTask?.name
        this.id = dataTask?.id
        this.order = dataTask?.order
        this.stageId = dataTask?.stageId
        this.createdAt = dataTask?.createdAt
        this.updatedAt = dataTask?.updatedAt
        this.desc = dataTask?.desc
    }
}