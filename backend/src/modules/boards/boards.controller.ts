import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardsService } from './boards.service';
import { FindBoardDto } from 'src/modules/boards/dto/find-board-dto'
import { UpdateBoardDto } from 'src/modules/boards/dto/update-board-dto';
import {ApiOperation, ApiTags, ApiResponse} from '@nestjs/swagger'
import { CreateBoardDtoSwagger } from 'src/modules/boards/dto/swagger/create-board-dto.swagger'
import { FindBoardDtoSwagger } from 'src/modules/boards/dto/swagger/find-board-dto.swagger';
import { UpdateBoardDtoSwagger } from 'src/modules/boards/dto/swagger/update-board-dto.swagger';
import { BadRequestSwagger } from 'src/helpers/bad-request.swagger';
import { NotFoundSwagger } from 'src/helpers/not-found.swagger';
import { FindFullBoardDtoSwagger } from './dto/swagger/find-full-board-dto.swagger';

@Controller('boards')
@ApiTags('Boards')
export class BoardsController {
    constructor( 
        private readonly boardsService: BoardsService,
    ){}
    
    @Post()
    @ApiOperation({summary: 'Create new kanban board'})
    //#region Responses
    @ApiResponse({
        status: 201, 
        description: 'New kanban board created successfully',
        type: CreateBoardDtoSwagger
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid request', 
        type: BadRequestSwagger
    })

    //#endregion
    async create(@Body() createBoardDto: CreateBoardDto){
        return await this.boardsService.create(createBoardDto)
    }
    @Get()
    @ApiOperation({summary: 'Show all kanban boards'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Showing all kanban boards', 
        type: FindBoardDtoSwagger, 
        isArray: true
    })
    //#endregion
    async findAll(){
        return await this.boardsService.findAll()
    }

    @Get(':id')
    @ApiOperation({summary: 'Show a specified kanban board'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Showing a specified kanban board',
        type: FindBoardDtoSwagger
    })
    @ApiResponse({
        status: 404, 
        description: 'Kanban board not found',
        type: NotFoundSwagger
    })
    //#endregion
    async findOneById(@Param() {id}: FindBoardDto){
        return await this.boardsService.findOneBy({id})
    }

    @Get(':id/full')
    @ApiOperation({summary: 'Show a specified board and it stages and tasks'})
    //#region Responses
    @ApiResponse({
        status: 200,
        description: 'Showing a specified board with it stages and tasks',
        type: FindFullBoardDtoSwagger
    })
    @ApiResponse({
        status: 404,
        description: 'Board not found',
        type: NotFoundSwagger
    })
    @ApiResponse({})
    //#endregion
    async findFullBoard(@Param() {id}: FindBoardDto){
        return await this.boardsService.findFullBoard({id})
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a specified kanban board'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Kanban updated',
        type: UpdateBoardDtoSwagger
    })
    @ApiResponse({
        status: 404, 
        description: 'Kanban not found',
        type: NotFoundSwagger
    })
    @ApiResponse({
        status: 400, 
        description: 'Invalid request',
        type: BadRequestSwagger,
        
    })
    //#endregion
    async update(@Param() {id}: FindBoardDto, @Body() updateBoardDto: UpdateBoardDto){
        return await this.boardsService.update({id}, updateBoardDto)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Remove a kanban board'})
    //#region Responses
    @ApiResponse({
        status: 200, 
        description: 'Kanban deleted',
    })
    @ApiResponse({
        status: 404, 
        description: 'Kanban not found',
        type: NotFoundSwagger
    })
    //#endregion
    async deleteById(@Param() {id}: FindBoardDto){
        return await this.boardsService.delete({id})
    }
} 
