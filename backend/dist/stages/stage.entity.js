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
exports.Stage = void 0;
const baseEntity_1 = require("../utils/baseEntity");
const typeorm_1 = require("typeorm");
let Stage = class Stage extends baseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Stage.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Stage.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Stage.prototype, "order", void 0);
Stage = __decorate([
    (0, typeorm_1.Entity)()
], Stage);
exports.Stage = Stage;
//# sourceMappingURL=stage.entity.js.map