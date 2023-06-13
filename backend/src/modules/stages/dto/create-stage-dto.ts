import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from "class-validator"

export class CreateStageDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Transform(({value})=> +value)
    order: number

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    boardId: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsHexColor()
    color?: string
}