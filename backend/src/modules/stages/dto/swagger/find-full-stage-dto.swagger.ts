import { ApiProperty } from "@nestjs/swagger";
import { FindStageDtoSwagger } from "./find-stage-dto.swagger";
import { FindTaskDtoSwagger } from "src/modules/tasks/dto/swagger/find-task-dto.swagger";

export class FindFullStageDtoSwagger extends FindStageDtoSwagger{
    @ApiProperty({type: FindTaskDtoSwagger, isArray: true})
    tasks: FindTaskDtoSwagger[]
}