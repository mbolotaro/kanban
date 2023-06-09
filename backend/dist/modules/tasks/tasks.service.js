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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tasks_entity_1 = require("./tasks.entity");
const messages_1 = require("../../helpers/messages");
const defineOrder_1 = require("../../utils/defineOrder");
let TasksService = class TasksService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    async create(createTaskDto) {
        try {
            const task = this.tasksRepository.create(createTaskDto);
            await (0, defineOrder_1.defineOrderAndSave)(task, this.tasksRepository);
        }
        catch (error) {
            throw new common_1.BadRequestException(messages_1.default.badRequest);
        }
    }
    async findAll() {
        await this.tasksRepository.find();
    }
    async findBy(findTaskDto) {
        try {
            return await this.tasksRepository.findOneByOrFail(findTaskDto);
        }
        catch (error) {
            throw new common_1.NotFoundException(messages_1.default.notFound('task', JSON.stringify(findTaskDto)));
        }
    }
    async update(findTaskDto, updateTaskDto) {
        const task = await this.findBy(findTaskDto);
        if (updateTaskDto.name != undefined)
            await this.tasksRepository.save(this.tasksRepository.merge(task, { name: updateTaskDto.name }));
        if (updateTaskDto.order != undefined) {
            await (0, defineOrder_1.updateOrderAndSave)(task.order, updateTaskDto.order, this.tasksRepository);
        }
        return task;
    }
    async delete(findTaskDto) {
        const task = await this.findBy(findTaskDto);
        try {
            await (0, defineOrder_1.deleteEntityAndSave)(task, this.tasksRepository);
        }
        catch (_a) {
            throw new common_1.BadRequestException(messages_1.default.badRequest);
        }
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tasks_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map