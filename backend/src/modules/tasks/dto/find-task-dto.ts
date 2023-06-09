import { Transform } from "class-transformer";
import { IsNumber, IsPositive} from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist";

export class FindTaskDto { 
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Transform(({value}: {value: string}) => +value)
    id: number
}