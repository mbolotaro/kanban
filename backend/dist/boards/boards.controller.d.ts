import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board-dto';
import { FindBoardDto } from './dto/find-board-dto';
import { UpdateBoardDto } from './dto/update-board-dto';
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    find(): Promise<import("./board.entity").Board[]>;
    findById(findBoardDto: FindBoardDto): Promise<import("./board.entity").Board>;
    create(createBoardDto: CreateBoardDto): Promise<import("./board.entity").Board>;
    update(findBoardDto: FindBoardDto, updateBoardDto: UpdateBoardDto): Promise<import("./board.entity").Board>;
    delete(findBoardDto: FindBoardDto): Promise<import("typeorm").DeleteResult>;
}
