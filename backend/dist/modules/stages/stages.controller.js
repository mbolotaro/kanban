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
    async updateById({ id }, updateStageDto) {
        return await this.stagesService.update({ id }, updateStageDto);
    }
    async deleteById({ id }) {
        return await this.stagesService.delete({ id });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stage_dto_1.CreateStageDto]),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_stage_dto_1.FindStageDto]),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_stage_dto_1.FindStageDto, update_stage_dto_1.UpdateStageDto]),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "updateById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_stage_dto_1.FindStageDto]),
    __metadata("design:returntype", Promise)
], StagesController.prototype, "deleteById", null);
StagesController = __decorate([
    (0, common_1.Controller)('stages'),
    __metadata("design:paramtypes", [stages_service_1.StagesService])
], StagesController);
exports.StagesController = StagesController;
//# sourceMappingURL=stages.controller.js.map