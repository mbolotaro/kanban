import { Transform } from "class-transformer";
import { IsNumber, IsPositive} from "class-validator";

export class FindTaskDto { 
    @IsNumber()
    @IsPositive()
    @Transform(({value}: {value: string}) => +value)
    id: number
}