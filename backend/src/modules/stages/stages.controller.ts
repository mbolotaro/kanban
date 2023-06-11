import { Controller, Post, Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage-dto';
import { FindStageDto } from './dto/find-stage-dto';
import { UpdateStageDto } from './dto/update-stage-dto';
import {ApiOperation, ApiTags, ApiResponse} from '@nestjs/swagger'
import { BadRequestSwagger } from 'src/helpers/bad-request.swagger';
import { FindStageDtoSwagger } from './dto/swagger/find-stage-dto.swagger';
import { CreateStageDtoSwagger } from './dto/swagger/create-stage-dto.swagger';
import { NotFoundSwagger } from 'src/helpers/not-found.swagger';
import { UpdateStageDtoSwagger } from './dto/swagger/update-stage-dto-swagger';
import { FindFullStageDtoSwagger } from './dto/swagger/find-full-stage-dto.swagger';

@Controller('stages')
@ApiTags('Stages')

export class StagesController {
    constructor(
        private readonly stagesService: StagesService
    ){}
    @Post()
    @ApiOperation({summary: 'Create a stage of a kanban board'})
    //#region Responses
    @ApiResponse({
        status: 201, 
        description: 'New stage created successfully',
        type: CreateStageDtoSwagger
    })
    @ApiResponse({
        status: 400, 
        description: 'Invalid request',
        type: BadRequestSwagger
    })
    //#endregion
    async create(@Body() createStageDto: CreateStageDto){
        return await this.stagesService.create(createStageDto)
    }

    @Get()
    @ApiOperation({summary: 'Show all stages of kanban boards'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Showing all stages',
        type: FindStageDtoSwagger,
        isArray: true
    })
    //#endregion
    async findAll(){
        return await this.stagesService.findAll()
    }

    @Get(':id')
    @ApiOperation({summary: 'Show a specified stage of a kanban board'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Showing a specified stage',
        type: FindStageDtoSwagger
    })
    @ApiResponse({
        status: 404, 
        description: 'Stage not found',
        type: NotFoundSwagger
    })
    //#endregion
    async findOneById(@Param() {id}: FindStageDto){
        return await this.stagesService.findOneBy({id})
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a specified stage of a kanban board'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Stage updated',
        type: UpdateStageDtoSwagger
    })
    @ApiResponse({
        status: 404, 
        description: 'Stage not found',
        type: NotFoundSwagger
    })
    @ApiResponse({
        status: 400, 
        description: 'Invalid request',
        type: BadRequestSwagger
    })
    //#endregion
    async update(@Param() {id}: FindStageDto, @Body() updateStageDto: UpdateStageDto){
        return await this.stagesService.update({id}, updateStageDto)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Remove a specified stage of a kanban board'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Stage deleted',
    })
    @ApiResponse({
        status: 404, 
        description: 'Stage not found',
        type: NotFoundSwagger
    })
    //#endregion
    async deleteById(@Param() {id} : FindStageDto){
        return await this.stagesService.delete({id})
    }

    @Get(':id/fullstage')
    @ApiOperation({summary: 'Show a specified stage and it tasks'})
    @ApiResponse({
        status: 200, 
        description: 'Showing a specified stage with it tasks',
        type: FindFullStageDtoSwagger,
        isArray: true
        
    })
    @ApiResponse({
        status: 404,
        description: 'Stage not found',
        type: NotFoundSwagger
        
    })
    async findFullStageById(@Param() {id}: FindStageDto){
        return await this.stagesService.findFullStage({id})
    }


}
