import { Repository } from 'typeorm';
import { StageEntity } from './entities/stages.entity';
import { CreateStageDto } from './dto/create-stage-dto';
import { FindStageDto } from './dto/find-stage-dto';
import { UpdateStageDto } from './dto/update-stage-dto';
export declare class StagesService {
    private readonly stagesRepository;
    constructor(stagesRepository: Repository<StageEntity>);
    create(createStageDto: CreateStageDto): Promise<StageEntity>;
    findAll(): Promise<StageEntity[]>;
    findOneBy(findStageDto: FindStageDto): Promise<StageEntity>;
    update(findStageDto: FindStageDto, updateStageDto: UpdateStageDto): Promise<StageEntity>;
    delete(findStageDto: FindStageDto): Promise<void>;
    findFullStage(findStageDto: FindStageDto): Promise<StageEntity>;
}
