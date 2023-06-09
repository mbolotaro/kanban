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
const boards_entity_1 = require("../boards/boards.entity");
const tasks_entity_1 = require("../tasks/tasks.entity");
const baseEntity_1 = require("../../utils/baseEntity");
const typeorm_1 = require("typeorm");
let StageEntity = class StageEntity extends baseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StageEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], StageEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'board_id' }),
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
    (0, typeorm_1.OneToMany)(() => tasks_entity_1.TaskEntity, (task) => task.stage),
    __metadata("design:type", Array)
], StageEntity.prototype, "tasks", void 0);
StageEntity = __decorate([
    (0, typeorm_1.Entity)('stages')
], StageEntity);
exports.StageEntity = StageEntity;
//# sourceMappingURL=stages.entity.js.map