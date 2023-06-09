import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board-dto';
import { BoardsService } from './boards.service';
import { FindBoardDto } from './dto/find-board-dto';
import { UpdateBoardDto } from './dto/update-board-dto';

@Controller('boards')
export class BoardsController {
    constructor(
        private readonly boardsService: BoardsService
    ){}
    @Post()
    async create(@Body() createBoardDto: CreateBoardDto){
        return await this.boardsService.create(createBoardDto)
    }
    @Get()
    async findAll(){
        return await this.boardsService.findAll()
    }

    @Get(':id')
    async findById(@Param() {id}: FindBoardDto){
        return await this.boardsService.findBy({id})
    }

    @Patch(':id')
    async update(@Param() {id}: FindBoardDto, @Body() updateBoardDto: UpdateBoardDto){
        return await this.boardsService.update({id}, updateBoardDto)
    }

    @Delete(':id')
    async deleteById(@Param() {id}: FindBoardDto){
        return await this.boardsService.delete({id})
    }

}
