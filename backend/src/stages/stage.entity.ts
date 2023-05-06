import { BaseEntity } from "src/utils/baseEntity";
import { Column, Entity} from "typeorm";

@Entity()
export class Stage extends BaseEntity{
    @Column()
    name: string
    @Column()
    color: string
    @Column()
    order: number
    
}