import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { FindTaskDto } from './dto/find-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ){}
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto){
        return await this.tasksService.create(createTaskDto)
    }
    @Get()
    async findAll(){
        return await this.tasksService.findAll()
    }

    @Get(':id')
    async findById(@Param() {id}: FindTaskDto){
        return await this.tasksService.findBy({id})
    }

    @Patch(':id')
    async update(@Param() {id}: FindTaskDto, @Body() updateTaskDto: UpdateTaskDto){
        return await this.tasksService.update({id}, updateTaskDto)
    }

    @Delete(':id')
    async deleteById(@Param() {id}: FindTaskDto){
        return await this.tasksService.delete({id})
    }
}
