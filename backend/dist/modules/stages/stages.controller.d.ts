import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage-dto';
import { FindStageDto } from './dto/find-stage-dto';
import { UpdateStageDto } from './dto/update-stage-dto';
export declare class StagesController {
    private readonly stagesService;
    constructor(stagesService: StagesService);
    create(createStageDto: CreateStageDto): Promise<import("./entities/stages.entity").StageEntity>;
    findAll(): Promise<import("./entities/stages.entity").StageEntity[]>;
    findOneById({ id }: FindStageDto): Promise<import("./entities/stages.entity").StageEntity>;
    findFullStageById({ id }: FindStageDto): Promise<import("./entities/stages.entity").StageEntity>;
    update({ id }: FindStageDto, updateStageDto: UpdateStageDto): Promise<import("./entities/stages.entity").StageEntity>;
    deleteById({ id }: FindStageDto): Promise<void>;
}
