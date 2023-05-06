import { Stage } from "src/stages/stage.entity"
import { IsString, IsNotEmpty, IsObject } from "class-validator"

export class CreateBoardDto{
    @IsString()
    @IsNotEmpty()
    name: string
}