import { BoardEntity } from './boards.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board-dto';
import { FindBoardDto } from './dto/find-board-dto';
import { UpdateBoardDto } from './dto/update-board-dto';
export declare class BoardsService {
    private readonly boardRepository;
    constructor(boardRepository: Repository<BoardEntity>);
    create(createBoardDto: CreateBoardDto): Promise<void>;
    findAll(): Promise<BoardEntity[]>;
    findBy(findBoardDto: FindBoardDto): Promise<BoardEntity>;
    update(findBoardDto: FindBoardDto, updateBoardDto: UpdateBoardDto): Promise<BoardEntity>;
    delete(findBoardDto: FindBoardDto): Promise<void>;
}
