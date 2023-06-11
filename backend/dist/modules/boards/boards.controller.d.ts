import { CreateBoardDto } from './dto/create-board-dto';
import { BoardsService } from './boards.service';
import { FindBoardDto } from 'src/modules/boards/dto/find-board-dto';
import { UpdateBoardDto } from 'src/modules/boards/dto/update-board-dto';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    create(createBoardDto: CreateBoardDto): Promise<import("./entities/boards.entity").BoardEntity>;
    findAll(): Promise<import("./entities/boards.entity").BoardEntity[]>;
    findById({ id }: FindBoardDto): Promise<import("./entities/boards.entity").BoardEntity>;
    update({ id }: FindBoardDto, updateBoardDto: UpdateBoardDto): Promise<import("./entities/boards.entity").BoardEntity>;
    deleteById({ id }: FindBoardDto): Promise<void>;
    findFullBoard({ id }: FindBoardDto): Promise<import("./entities/boards.entity").BoardEntity>;
}
