import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './tasks.entity';
import messages from 'src/helpers/messages';
import { defineOrderAndSave, deleteEntityAndSave, updateOrderAndSave } from 'src/utils/defineOrder';
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
            await defineOrderAndSave(task, this.tasksRepository)
        } catch (error) {
            throw new BadRequestException(messages.badRequest)
        }
    }

    async findAll(){
        await this.tasksRepository.find()
    }

    async findBy(findTaskDto: FindTaskDto){
        try{
            return await this.tasksRepository.findOneByOrFail(findTaskDto)
        } catch (error) {
            throw new NotFoundException(messages.notFound('task', JSON.stringify(findTaskDto)))
        }
    }

    async update(findTaskDto: FindTaskDto, updateTaskDto: UpdateTaskDto){
        const task = await this.findBy(findTaskDto)
        if(updateTaskDto.name != undefined) await this.tasksRepository.save(this.tasksRepository.merge(task, {name: updateTaskDto.name}))
        if(updateTaskDto.order != undefined) {await updateOrderAndSave(task.order, updateTaskDto.order, this.tasksRepository)}
        return task
    }

    async delete(findTaskDto: FindTaskDto){
        const task = await this.findBy(findTaskDto)
        try{
            await deleteEntityAndSave(task, this.tasksRepository)
        } catch {
            throw new BadRequestException(messages.badRequest)
        }
    }
}
