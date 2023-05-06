import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/utils/baseEntity";
import { Stage } from "src/stages/stage.entity";

@Entity()
export class Board extends BaseEntity{
    @Column()
    name: string
}