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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StagesController = void 0;
const common_1 = require("@nestjs/common");
const stages_service_1 = require("./stages.service");
const create_stage_dto_1 = require("./dto/create-stage-dto");
const find_stage_dto_1 = require("./dto/find-stage-dto");
const update_stage_dto_1 = require("./dto/update-stage-dto");
const swagger_1 = require("@nestjs/swagger");
const bad_request_swagger_1 = require("../../helpers/bad-request.swagger");
const find_stage_dto_swagger_1 = require("./dto/swagger/find-stage-dto.swagger");
const create_stage_dto_swagger_1 = require("./dto/swagger/create-stage-dto.swagger");
const not_found_swagger_1 = require("../../helpers/not-found.swagger");
const update_stage_dto_swagger_1 = require("./dto/swagger/update-stage-dto-swagger");
let StagesController = class StagesController {
    constructor(stagesService) {
        this.stagesService = stagesService;
    }
    async create(createStageDto) {
        return await this.stagesService.create(createStageDto);
    }
    async findAll() {
        return await this.stagesService.findAll();
    }
    async findById({ id }) {
        return await this.stagesService.findBy({ id });
    }
    async update({ id }, updateStageDto) {
        return await this.stagesService.update({ id }, updateStageDto);
    }
    async deleteById({ id }) {
        return await this.stagesService.delete({ id });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a stage of a kanban board' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'New stage created successfully',
        type: create_stage_dto_swagger_1.CreateStageDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request',
        type: bad_request_swagger_1.BadRequestSwagger
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stage_dto_1.CreateStageDto]),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Show all stages of kanban boards' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Showing all stages',
        type: find_stage_dto_swagger_1.FindStageDtoSwagger,
        isArray: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Show a specified stage of a kanban board' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Showing a specified stage',
        type: find_stage_dto_swagger_1.FindStageDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Stage not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_stage_dto_1.FindStageDto]),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specified stage of a kanban board' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Stage updated',
        type: update_stage_dto_swagger_1.UpdateStageDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Stage not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request',
        type: bad_request_swagger_1.BadRequestSwagger
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_stage_dto_1.FindStageDto, update_stage_dto_1.UpdateStageDto]),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a specified stage of a kanban board' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Stage deleted',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Stage not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_stage_dto_1.FindStageDto]),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "deleteById", null);
StagesController = __decorate([
    (0, common_1.Controller)('stages'),
    (0, swagger_1.ApiTags)('Stages'),
    __metadata("design:paramtypes", [stages_service_1.StagesService])
], StagesController);
exports.StagesController = StagesController;
//# sourceMappingURL=stages.controller.js.map