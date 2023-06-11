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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task-dto");
const find_task_dto_1 = require("./dto/find-task-dto");
const update_task_dto_1 = require("./dto/update-task-dto");
const swagger_1 = require("@nestjs/swagger");
const create_task_dto_swagger_1 = require("./dto/swagger/create-task-dto.swagger");
const bad_request_swagger_1 = require("../../helpers/bad-request.swagger");
const find_task_dto_swagger_1 = require("./dto/swagger/find-task-dto.swagger");
const not_found_swagger_1 = require("../../helpers/not-found.swagger");
const update_task_dto_swagger_1 = require("./dto/swagger/update-task-dto.swagger");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    async create(createTaskDto) {
        return await this.tasksService.create(createTaskDto);
    }
    async findAll() {
        return await this.tasksService.findAll();
    }
    async findById({ id }) {
        return await this.tasksService.findBy({ id });
    }
    async update({ id }, updateTaskDto) {
        return await this.tasksService.update({ id }, updateTaskDto);
    }
    async deleteById({ id }) {
        return await this.tasksService.delete({ id });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'create a task specifing which stage of a board it will be' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'New task created successfully',
        type: create_task_dto_swagger_1.CreateTaskDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request',
        type: bad_request_swagger_1.BadRequestSwagger
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Show all tasks' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Showing all tasks',
        type: find_task_dto_swagger_1.FindTaskDtoSwagger,
        isArray: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Show a specified tasks' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Showing a specified task',
        type: find_task_dto_swagger_1.FindTaskDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Task not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_task_dto_1.FindTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specified task' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Task updated',
        type: update_task_dto_swagger_1.UpdateTaskDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Task not found',
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
    __metadata("design:paramtypes", [find_task_dto_1.FindTaskDto, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a specified task' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Task deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Task not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_task_dto_1.FindTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteById", null);
TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, swagger_1.ApiTags)('Tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map