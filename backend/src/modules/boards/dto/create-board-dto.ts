import {IsString, IsNumber, IsNotEmpty, IsPositive, IsOptional, IsHexColor} from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateBoardDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({value}) => +value)
    order?: number
}