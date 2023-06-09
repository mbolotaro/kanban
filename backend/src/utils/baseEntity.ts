import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number
    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: string
    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: string
}