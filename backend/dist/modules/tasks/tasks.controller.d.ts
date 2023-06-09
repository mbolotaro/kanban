import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { FindTaskDto } from './dto/find-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<void>;
    findAll(): Promise<void>;
    findById({ id }: FindTaskDto): Promise<import("./tasks.entity").TaskEntity>;
    update({ id }: FindTaskDto, updateTaskDto: UpdateTaskDto): Promise<import("./tasks.entity").TaskEntity>;
    deleteById({ id }: FindTaskDto): Promise<void>;
}
