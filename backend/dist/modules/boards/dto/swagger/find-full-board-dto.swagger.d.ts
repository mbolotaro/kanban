import { FindBoardDtoSwagger } from "src/modules/boards/dto/swagger/find-board-dto.swagger";
import { FindFullStageDtoSwagger } from "src/modules/stages/dto/swagger/find-full-stage-dto.swagger";
export declare class FindFullBoardDtoSwagger extends FindBoardDtoSwagger {
    stages: FindFullStageDtoSwagger[];
}
