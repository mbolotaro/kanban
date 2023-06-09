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
exports.StagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const stage_entity_1 = require("./entities/stage.entity");
const typeorm_2 = require("@nestjs/typeorm");
const messages_1 = require("../../helpers/messages");
const define_order_1 = require("../../utils/define-order");
let StagesService = class StagesService {
    constructor(stagesRepository) {
        this.stagesRepository = stagesRepository;
    }
    async create(createStageDto) {
        try {
            const stage = this.stagesRepository.create(createStageDto);
            await (0, define_order_1.defineOrderAndSave)(stage, this.stagesRepository);
        }
        catch (error) {
            throw new common_1.BadRequestException(messages_1.default.badRequest);
        }
    }
    async findAll() {
        return await this.stagesRepository.find();
    }
    async findBy(findStageDto) {
        try {
            return await this.stagesRepository.findOneByOrFail(findStageDto);
        }
        catch (error) {
            throw new common_1.NotFoundException(messages_1.default.notFound('stage', JSON.stringify(findStageDto)));
        }
    }
    async update(findStageDto, updateStageDto) {
        const stage = await this.findBy(findStageDto);
        if (updateStageDto.name != undefined)
            this.stagesRepository.merge(stage, { name: updateStageDto.name });
        if (updateStageDto.order != undefined) {
            await (0, define_order_1.updateOrderAndSave)(stage.order, updateStageDto.order, this.stagesRepository);
        }
        return await this.stagesRepository.save(stage);
    }
    async delete(findStageDto) {
        const board = await this.findBy(findStageDto);
        try {
            await (0, define_order_1.deleteEntityAndSave)(board, this.stagesRepository);
        }
        catch (_a) {
            throw new common_1.BadRequestException(messages_1.default.badRequest);
        }
    }
};
StagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(stage_entity_1.StageEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StagesService);
exports.StagesService = StagesService;
//# sourceMappingURL=stages.service.js.map