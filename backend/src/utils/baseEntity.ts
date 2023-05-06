import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string
    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: string
    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: string
}