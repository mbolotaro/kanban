import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage-dto';
import { FindStageDto } from './dto/find-stage-dto';
import { UpdateStageDto } from './dto/update-stage-dto';
export declare class StagesController {
    private readonly stagesService;
    constructor(stagesService: StagesService);
    create(createStageDto: CreateStageDto): Promise<void>;
    findAll(): Promise<void>;
    findById({ id }: FindStageDto): Promise<import("./stages.entity").StageEntity>;
    updateById({ id }: FindStageDto, updateStageDto: UpdateStageDto): Promise<import("./stages.entity").StageEntity>;
    deleteById({ id }: FindStageDto): Promise<void>;
}
