import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from "class-validator";

export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    desc?: string

    @IsNumber()
    @IsPositive()
    stageId: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    order: number
    
}