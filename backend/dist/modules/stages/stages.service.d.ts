import { Repository } from 'typeorm';
import { StageEntity } from './stages.entity';
import { CreateStageDto } from './dto/create-stage-dto';
import { FindStageDto } from './dto/find-stage-dto';
import { UpdateStageDto } from './dto/update-stage-dto';
export declare class StagesService {
    private readonly stagesRepository;
    constructor(stagesRepository: Repository<StageEntity>);
    create(createStageDto: CreateStageDto): Promise<void>;
    findAll(): Promise<void>;
    findBy(findStageDto: FindStageDto): Promise<StageEntity>;
    update(findStageDto: FindStageDto, updateStageDto: UpdateStageDto): Promise<StageEntity>;
    delete(findStageDto: FindStageDto): Promise<void>;
}
