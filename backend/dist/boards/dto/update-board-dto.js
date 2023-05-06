"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoardDto = void 0;
const create_board_dto_1 = require("./create-board-dto");
const dist_1 = require("@nestjs/mapped-types/dist");
class UpdateBoardDto extends (0, dist_1.PartialType)(create_board_dto_1.CreateBoardDto) {
    constructor() {
        super();
    }
}
exports.UpdateBoardDto = UpdateBoardDto;
//# sourceMappingURL=update-board-dto.js.map