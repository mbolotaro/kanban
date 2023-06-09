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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const boards_entity_1 = require("./boards.entity");
const typeorm_2 = require("typeorm");
const messages_1 = require("../../helpers/messages");
const defineOrder_1 = require("../../utils/defineOrder");
let BoardsService = class BoardsService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    async create(createBoardDto) {
        const board = this.boardRepository.create(createBoardDto);
        try {
            await (0, defineOrder_1.defineOrderAndSave)(board, this.boardRepository);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAll() {
        return await this.boardRepository.find();
    }
    async findBy(findBoardDto) {
        try {
            return await this.boardRepository.findOneByOrFail(findBoardDto);
        }
        catch (error) {
            throw new common_1.NotFoundException(messages_1.default.notFound('board', JSON.stringify(findBoardDto)));
        }
    }
    async update(findBoardDto, updateBoardDto) {
        const board = await this.findBy(findBoardDto);
        if (updateBoardDto.name != undefined)
            await this.boardRepository.save(this.boardRepository.merge(board, { name: updateBoardDto.name }));
        if (updateBoardDto.order != undefined) {
            await (0, defineOrder_1.updateOrderAndSave)(board.order, updateBoardDto.order, this.boardRepository);
        }
        return board;
    }
    async delete(findBoardDto) {
        const board = await this.findBy(findBoardDto);
        try {
            await (0, defineOrder_1.deleteEntityAndSave)(board, this.boardRepository);
        }
        catch (error) {
            throw new common_1.BadRequestException(messages_1.default.badRequest);
        }
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(boards_entity_1.BoardEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map