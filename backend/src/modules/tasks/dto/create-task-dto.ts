import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger/dist";

export class CreateTaskDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    desc?: string

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    stageId: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    order: number
    
}