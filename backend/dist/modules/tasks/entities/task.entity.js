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
exports.TaskEntity = void 0;
const stage_entity_1 = require("../../stages/entities/stage.entity");
const base_entity_1 = require("../../../utils/base-entity");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let TaskEntity = class TaskEntity extends base_entity_1.BaseEntity {
    constructor(dataTask) {
        super();
        this.name = dataTask === null || dataTask === void 0 ? void 0 : dataTask.name;
        this.id = dataTask === null || dataTask === void 0 ? void 0 : dataTask.id;
        this.order = dataTask === null || dataTask === void 0 ? void 0 : dataTask.order;
        this.stageId = dataTask === null || dataTask === void 0 ? void 0 : dataTask.stageId;
        this.createdAt = dataTask === null || dataTask === void 0 ? void 0 : dataTask.createdAt;
        this.updatedAt = dataTask === null || dataTask === void 0 ? void 0 : dataTask.updatedAt;
        this.desc = dataTask === null || dataTask === void 0 ? void 0 : dataTask.desc;
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stage_id' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "stageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stage_entity_1.StageEntity, (stage) => stage.tasks),
    (0, typeorm_1.JoinColumn)({
        name: 'stage_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", stage_entity_1.StageEntity)
], TaskEntity.prototype, "stage", void 0);
TaskEntity = __decorate([
    (0, typeorm_1.Entity)('tasks'),
    __metadata("design:paramtypes", [Object])
], TaskEntity);
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=task.entity.js.map