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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const create_board_dto_1 = require("./dto/create-board-dto");
const boards_service_1 = require("./boards.service");
const find_board_dto_1 = require("./dto/find-board-dto");
const update_board_dto_1 = require("./dto/update-board-dto");
const swagger_1 = require("@nestjs/swagger");
const create_board_dto_swagger_1 = require("./dto/swagger/create-board-dto.swagger");
const find_board_dto_swagger_1 = require("./dto/swagger/find-board-dto.swagger");
const update_board_dto_swagger_1 = require("./dto/swagger/update-board-dto.swagger");
const bad_request_swagger_1 = require("../../helpers/bad-request.swagger");
const not_found_swagger_1 = require("../../helpers/not-found.swagger");
const find_full_board_dto_swagger_1 = require("./dto/swagger/find-full-board-dto.swagger");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    async create(createBoardDto) {
        return await this.boardsService.create(createBoardDto);
    }
    async findAll() {
        return await this.boardsService.findAll();
    }
    async findOneById({ id }) {
        return await this.boardsService.findOneBy({ id });
    }
    async update({ id }, updateBoardDto) {
        return await this.boardsService.update({ id }, updateBoardDto);
    }
    async deleteById({ id }) {
        return await this.boardsService.delete({ id });
    }
    async findFullBoard({ id }) {
        return await this.boardsService.findFullBoard({ id });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new kanban board' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'New kanban board created successfully',
        type: create_board_dto_swagger_1.CreateBoardDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request',
        type: bad_request_swagger_1.BadRequestSwagger
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Show all kanban boards' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Showing all kanban boards',
        type: find_board_dto_swagger_1.FindBoardDtoSwagger,
        isArray: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Show a specified kanban board' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Showing a specified kanban board',
        type: find_board_dto_swagger_1.FindBoardDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Kanban board not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_board_dto_1.FindBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specified kanban board' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kanban updated',
        type: update_board_dto_swagger_1.UpdateBoardDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Kanban not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request',
        type: bad_request_swagger_1.BadRequestSwagger,
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_board_dto_1.FindBoardDto, update_board_dto_1.UpdateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a kanban board' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Kanban deleted',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Kanban not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_board_dto_1.FindBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Get)(':id/fullboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Show a specified board and it stages and tasks' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Showing a specified board with it stages and tasks',
        type: find_full_board_dto_swagger_1.FindFullBoardDtoSwagger
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Board not found',
        type: not_found_swagger_1.NotFoundSwagger
    }),
    (0, swagger_1.ApiResponse)({}),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_board_dto_1.FindBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findFullBoard", null);
BoardsController = __decorate([
    (0, common_1.Controller)('boards'),
    (0, swagger_1.ApiTags)('Boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
exports.BoardsController = BoardsController;
//# sourceMappingURL=boards.controller.js.map