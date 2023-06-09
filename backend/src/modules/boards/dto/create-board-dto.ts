import {IsString, IsNumber, IsNotEmpty, IsPositive, IsOptional} from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateBoardDto{
    @IsString()
    @IsNotEmpty()
    name: string
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({value}) => +value)
    order?: number
}