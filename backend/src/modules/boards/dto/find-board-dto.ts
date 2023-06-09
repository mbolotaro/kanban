import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {IsNotEmpty, IsNumber, IsPositive} from 'class-validator'

export class FindBoardDto {
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Transform(({value}) => +value)
    id: number
}