"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindFullStageDtoSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const find_stage_dto_swagger_1 = require("./find-stage-dto.swagger");
const find_task_dto_swagger_1 = require("../../../tasks/dto/swagger/find-task-dto.swagger");
class FindFullStageDtoSwagger extends find_stage_dto_swagger_1.FindStageDtoSwagger {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: find_task_dto_swagger_1.FindTaskDtoSwagger, isArray: true }),
    __metadata("design:type", Array)
], FindFullStageDtoSwagger.prototype, "tasks", void 0);
exports.FindFullStageDtoSwagger = FindFullStageDtoSwagger;
//# sourceMappingURL=find-full-stage-dto.swagger.js.map