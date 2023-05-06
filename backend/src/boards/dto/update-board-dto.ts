import { IsObject, IsEmpty } from "class-validator";
import { CreateBoardDto } from "./create-board-dto";
import { PartialType } from "@nestjs/mapped-types/dist";
import { Stage } from "src/stages/stage.entity";
import { IsNull } from "typeorm";

export class UpdateBoardDto extends PartialType(CreateBoardDto){
    constructor(){
        super()
    }

}