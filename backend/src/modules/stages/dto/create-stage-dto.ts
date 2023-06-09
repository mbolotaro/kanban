import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator"

export class CreateStageDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsOptional()
    @IsNumber()
    @Transform(({value})=> +value)
    order: number
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    boardId: number
}