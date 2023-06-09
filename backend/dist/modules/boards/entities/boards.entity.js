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
exports.BoardEntity = void 0;
const stages_entity_1 = require("../../stages/entities/stages.entity");
const base_entity_1 = require("../../../utils/base-entity");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let BoardEntity = class BoardEntity extends base_entity_1.BaseEntity {
    constructor(board) {
        super();
        this.id = board === null || board === void 0 ? void 0 : board.id;
        this.createdAt = board === null || board === void 0 ? void 0 : board.createdAt;
        this.name = board === null || board === void 0 ? void 0 : board.name;
        this.order = board === null || board === void 0 ? void 0 : board.order;
        this.stages = board === null || board === void 0 ? void 0 : board.stages;
        this.updatedAt = board === null || board === void 0 ? void 0 : board.updatedAt;
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BoardEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BoardEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stages_entity_1.StageEntity, (stage) => stage.board, { cascade: true }),
    __metadata("design:type", Array)
], BoardEntity.prototype, "stages", void 0);
BoardEntity = __decorate([
    (0, typeorm_1.Entity)('boards'),
    __metadata("design:paramtypes", [Object])
], BoardEntity);
exports.BoardEntity = BoardEntity;
//# sourceMappingURL=boards.entity.js.map