import { FindStageDtoSwagger } from "./find-stage-dto.swagger";
import { FindTaskDtoSwagger } from "src/modules/tasks/dto/swagger/find-task-dto.swagger";
export declare class FindFullStageDtoSwagger extends FindStageDtoSwagger {
    tasks: FindTaskDtoSwagger[];
}
