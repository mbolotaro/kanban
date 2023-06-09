import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import { FindTaskDto } from './dto/find-task-dto';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
export declare class TasksService {
    private readonly tasksRepository;
    constructor(tasksRepository: Repository<TaskEntity>);
    create(createTaskDto: CreateTaskDto): Promise<void>;
    findAll(): Promise<TaskEntity[]>;
    findBy(findTaskDto: FindTaskDto): Promise<TaskEntity>;
    update(findTaskDto: FindTaskDto, updateTaskDto: UpdateTaskDto): Promise<TaskEntity>;
    delete(findTaskDto: FindTaskDto): Promise<void>;
}
