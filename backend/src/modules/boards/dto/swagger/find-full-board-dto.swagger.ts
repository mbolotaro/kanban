import { FindBoardDtoSwagger } from "src/modules/boards/dto/swagger/find-board-dto.swagger";
import { ApiProperty } from "@nestjs/swagger";
import { FindFullStageDtoSwagger } from "src/modules/stages/dto/swagger/find-full-stage-dto.swagger";

export class FindFullBoardDtoSwagger extends FindBoardDtoSwagger{
    @ApiProperty({type: FindFullStageDtoSwagger, isArray: true})
    stages: FindFullStageDtoSwagger[]
}