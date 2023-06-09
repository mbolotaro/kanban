import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage-dto';
import { FindStageDto } from './dto/find-stage-dto';
import { UpdateStageDto } from './dto/update-stage-dto';
export declare class StagesController {
    private readonly stagesService;
    constructor(stagesService: StagesService);
    create(createStageDto: CreateStageDto): Promise<void>;
    findAll(): Promise<import("./entities/stage.entity").StageEntity[]>;
    findById({ id }: FindStageDto): Promise<import("./entities/stage.entity").StageEntity>;
    update({ id }: FindStageDto, updateStageDto: UpdateStageDto): Promise<import("./entities/stage.entity").StageEntity>;
    deleteById({ id }: FindStageDto): Promise<void>;
}
