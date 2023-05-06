import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board-dto';
import { FindBoardDto } from './dto/find-board-dto';
import { UpdateBoardDto } from './dto/update-board-dto';
export declare class BoardsService {
    private readonly boardsRepository;
    constructor(boardsRepository: Repository<Board>);
    create(createBoardDto: CreateBoardDto): Promise<Board>;
    find(): Promise<Board[]>;
    findById(findBoardDto: FindBoardDto): Promise<Board>;
    update(findBoardDto: FindBoardDto, updateBoardDto: UpdateBoardDto): Promise<Board>;
    delete(findBoardDto: FindBoardDto): Promise<import("typeorm").DeleteResult>;
}
