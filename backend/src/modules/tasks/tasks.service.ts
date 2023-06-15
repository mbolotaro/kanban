import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './entities/task.entity';
import messages from 'src/helpers/messages';
import { defineOrderAndSave, deleteEntityAndSave, updateOrderAndSave } from 'src/utils/define-order';
import { FindTaskDto } from './dto/find-task-dto';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity) private readonly tasksRepository: Repository<TaskEntity>
    ){}

    async create(createTaskDto: CreateTaskDto){
        try {
            const task = this.tasksRepository.create(createTaskDto)
            return await defineOrderAndSave(task, this.tasksRepository)
        } catch (error) {
            throw new BadRequestException(messages.badRequest)
        }
    }

    async findAll(){
        return await this.tasksRepository.find()
    }

    async findOneBy(findTaskDto: FindTaskDto){
        try{
            return await this.tasksRepository.findOneByOrFail(findTaskDto)
        } catch (error) {
            throw new NotFoundException(messages.notFound('task', JSON.stringify(findTaskDto)))
        }
    }

    async update(findTaskDto: FindTaskDto, updateTaskDto: UpdateTaskDto){
        const task = await this.findOneBy(findTaskDto)
        const order = updateTaskDto.order
        delete updateTaskDto.order
        this.tasksRepository.merge(task, updateTaskDto)
        if(updateTaskDto.order != undefined) {
            await updateOrderAndSave(task.order, order, this.tasksRepository)
        }
        return await this.tasksRepository.save(task)
    }

    async delete(findTaskDto: FindTaskDto){
        const task = await this.findOneBy(findTaskDto)
        try{
            await deleteEntityAndSave(task, this.tasksRepository)
        } catch {
            throw new BadRequestException(messages.badRequest)
        }
    }
}
