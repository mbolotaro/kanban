import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { FindTaskDto } from './dto/find-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import {ApiOperation, ApiTags, ApiResponse} from '@nestjs/swagger'
import { CreateTaskDtoSwagger } from './dto/swagger/create-task-dto.swagger';
import { BadRequestSwagger } from 'src/helpers/bad-request.swagger';
import { FindTaskDtoSwagger } from './dto/swagger/find-task-dto.swagger';
import { NotFoundSwagger } from 'src/helpers/not-found.swagger';
import { UpdateTaskDtoSwagger } from './dto/swagger/update-task-dto.swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ){}
    @Post()
    @ApiOperation({summary: 'create a task specifing which stage of a board it will be'})
    //#region Responses
    @ApiResponse({
        status: 201, 
        description: 'New task created successfully',
        type: CreateTaskDtoSwagger
    })
    @ApiResponse({
        status: 400, 
        description: 'Invalid request',
        type: BadRequestSwagger
    })
    //#endregion
    async create(@Body() createTaskDto: CreateTaskDto){
        return await this.tasksService.create(createTaskDto)
    }
    @Get()
    @ApiOperation({summary: 'Show all tasks'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Showing all tasks',
        type: FindTaskDtoSwagger,
        isArray: true
    })
    //#endregion
    async findAll(){
        return await this.tasksService.findAll()
    }

    @Get(':id')
    @ApiOperation({summary: 'Show a specified tasks'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Showing a specified task',
        type: FindTaskDtoSwagger
    })
    @ApiResponse({
        status: 404, 
        description: 'Task not found',
        type: NotFoundSwagger
    })
    //#endregion
    async findById(@Param() {id}: FindTaskDto){
        return await this.tasksService.findOneBy({id})
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a specified task'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Task updated',
        type: UpdateTaskDtoSwagger
    })
    @ApiResponse({
        status: 404, 
        description: 'Task not found',
        type: NotFoundSwagger
    })
    @ApiResponse({
        status: 400, 
        description: 'Invalid request',
        type: BadRequestSwagger
    })
    //#endregion
    async update(@Param() {id}: FindTaskDto, @Body() updateTaskDto: UpdateTaskDto){
        return await this.tasksService.update({id}, updateTaskDto)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Remove a specified task'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Task deleted'
    })
    @ApiResponse({
        status: 404, 
        description: 'Task not found',
        type: NotFoundSwagger
    })
    //#endregion
    async deleteById(@Param() {id}: FindTaskDto){
        return await this.tasksService.delete({id})
    }
}
