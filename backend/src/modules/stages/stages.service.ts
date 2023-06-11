import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StageEntity } from './entities/stages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStageDto } from './dto/create-stage-dto';
import messages from 'src/helpers/messages';
import { FindStageDto } from './dto/find-stage-dto';
import { UpdateStageDto } from './dto/update-stage-dto';
import { defineOrderAndSave, deleteEntityAndSave, updateOrderAndSave } from 'src/utils/define-order';

@Injectable()
export class StagesService {
    constructor(
        @InjectRepository(StageEntity) private readonly stagesRepository: Repository<StageEntity>
    ){}

    async create(createStageDto: CreateStageDto){
        try {
            const stage = this.stagesRepository.create(createStageDto)
            return await defineOrderAndSave(stage, this.stagesRepository)
        } catch (error) {
            throw new BadRequestException(messages.badRequest)
        }
    }

    async findAll(){
        return await this.stagesRepository.find()
    }

    async findOneBy(findStageDto: FindStageDto){
        try{
            return await this.stagesRepository.findOneByOrFail(findStageDto)
        } catch (error) {
            throw new NotFoundException(messages.notFound('stage', JSON.stringify(findStageDto)))
        } 
    }

    async update(findStageDto: FindStageDto, updateStageDto: UpdateStageDto){
        const stage = await this.findOneBy(findStageDto)
        if(updateStageDto.name != undefined) 
            this.stagesRepository.merge(stage, {name: updateStageDto.name})
        if(updateStageDto.order != undefined) {
            await updateOrderAndSave(stage.order, updateStageDto.order, this.stagesRepository)
        }
        return await this.stagesRepository.save(stage)
    }

    async delete(findStageDto: FindStageDto){
        const board = await this.findOneBy(findStageDto)
        try{
            await deleteEntityAndSave(board, this.stagesRepository)
        } catch {
            throw new BadRequestException(messages.badRequest)
        }
    }

    async findFullStage(findStageDto: FindStageDto){
        try{
            return await this.stagesRepository.createQueryBuilder('stage')
            .leftJoinAndSelect('stage.tasks', 'tasks')
            .where('stage.id = :id', findStageDto)
            .getOneOrFail()
            
        } catch {
            throw new NotFoundException(messages.notFound('stage', findStageDto))
        }
    }
}
