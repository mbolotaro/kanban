import { Body, Controller, Post, Get, Param, Patch, Delete} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board-dto';
import { FindBoardDto } from './dto/find-board-dto';
import { UpdateBoardDto } from './dto/update-board-dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    @Get()
    async find(){
        return await this.boardsService.find()
    }

    @Get(':id')
    async findById(@Param() findBoardDto: FindBoardDto){
        return await this.boardsService.findById(findBoardDto)
    }

    @Post()
    async create(@Body() createBoardDto: CreateBoardDto){
        return await this.boardsService.create(createBoardDto)
    }

    @Patch(':id')
    async update(@Param() findBoardDto: FindBoardDto, @Body() updateBoardDto: UpdateBoardDto){
        return await this.boardsService.update(findBoardDto, updateBoardDto)
    }

    @Delete(':id')
    async delete(@Param() findBoardDto: FindBoardDto){
        return await this.boardsService.delete(findBoardDto)
    }

}
