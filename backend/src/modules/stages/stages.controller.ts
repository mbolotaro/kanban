import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, UsePipes, ValidationPipe, HttpStatus} from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage-dto';
import { FindStageDto } from './dto/find-stage-dto';
import { UpdateStageDto } from './dto/update-stage-dto';


@Controller('stages')
export class StagesController {
    constructor(
        private readonly stagesService: StagesService
    ){}
    @Post()
    async create(@Body() createStageDto: CreateStageDto){
        return await this.stagesService.create(createStageDto)
    }
    @Get()
    async findAll(){
        return await this.stagesService.findAll()
    }
    @Get(':id')
    async findById(@Param() {id}: FindStageDto){
        return await this.stagesService.findBy({id})
    }
    @Patch(':id')
    async updateById(@Param() {id}: FindStageDto, @Body() updateStageDto: UpdateStageDto){
        return await this.stagesService.update({id}, updateStageDto)
    }
    @Delete(':id')
    async deleteById(@Param() {id}: FindStageDto){
        return await this.stagesService.delete({id})
    }
}
