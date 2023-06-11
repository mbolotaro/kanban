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
exports.StageEntity = void 0;
const boards_entity_1 = require("../../boards/entities/boards.entity");
const task_entity_1 = require("../../tasks/entities/task.entity");
const base_entity_1 = require("../../../utils/base-entity");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let StageEntity = class StageEntity extends base_entity_1.BaseEntity {
    constructor(dataStage) {
        super();
        this.name = dataStage === null || dataStage === void 0 ? void 0 : dataStage.name;
        this.id = dataStage === null || dataStage === void 0 ? void 0 : dataStage.id;
        this.order = dataStage === null || dataStage === void 0 ? void 0 : dataStage.order;
        this.boardId = dataStage === null || dataStage === void 0 ? void 0 : dataStage.boardId;
        this.createdAt = dataStage === null || dataStage === void 0 ? void 0 : dataStage.createdAt;
        this.updatedAt = dataStage === null || dataStage === void 0 ? void 0 : dataStage.updatedAt;
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StageEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StageEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'board_id' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StageEntity.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => boards_entity_1.BoardEntity, (board) => board.stages),
    (0, typeorm_1.JoinColumn)({
        name: 'board_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", boards_entity_1.BoardEntity)
], StageEntity.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.TaskEntity, (task) => task.stage, { cascade: true }),
    __metadata("design:type", Array)
], StageEntity.prototype, "tasks", void 0);
StageEntity = __decorate([
    (0, typeorm_1.Entity)('stages'),
    __metadata("design:paramtypes", [Object])
], StageEntity);
exports.StageEntity = StageEntity;
//# sourceMappingURL=stages.entity.js.map