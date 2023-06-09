import { Transform } from 'class-transformer'
import {IsNotEmpty, IsNumber, IsPositive} from 'class-validator'

export class FindBoardDto {
    @IsNumber()
    @IsPositive()
    @Transform(({value}) => +value)
    id: number
}