import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entities/boards.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board-dto'
import messages from 'src/helpers/messages';
import { FindBoardDto } from './dto/find-board-dto';
import { UpdateBoardDto } from './dto/update-board-dto';
import { defineOrderAndSave, deleteEntityAndSave, updateOrderAndSave } from 'src/utils/define-order';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardEntity) private readonly boardRepository: Repository<BoardEntity>
    ){}

    async create(createBoardDto: CreateBoardDto){
        const board = this.boardRepository.create(createBoardDto)
        try {
            return await defineOrderAndSave(board, this.boardRepository)
            
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async findAll(){
        return await this.boardRepository.find()
    }

    async findBy(findBoardDto: FindBoardDto){
        try{
            return await this.boardRepository.findOneByOrFail(findBoardDto)
        } catch (error) {
            throw new NotFoundException(messages.notFound('board', JSON.stringify(findBoardDto)))
        }
    }


    async update(findBoardDto: FindBoardDto, updateBoardDto: UpdateBoardDto){
        const board = await this.findBy(findBoardDto)
        if(updateBoardDto.name != undefined) 
            this.boardRepository.merge(board, {name: updateBoardDto.name})
        if(updateBoardDto.order != undefined) {
            return await updateOrderAndSave(board.order, updateBoardDto.order, this.boardRepository
        )}
        
        return await this.boardRepository.save(board)
    }
 
    async delete(findBoardDto: FindBoardDto){
        const board = await this.findBy(findBoardDto)
        try {
            await deleteEntityAndSave(board, this.boardRepository)
        } catch (error) {
            throw new BadRequestException(messages.badRequest)
        }
    }

    async findFullBoard({id}: FindBoardDto){
        const board = await this.boardRepository.createQueryBuilder('board')
        .leftJoinAndSelect('board.stages', 'stages')
        .leftJoinAndSelect('stages.tasks', 'tasks')
        .where('board.id = :id', {id})
        .getOne()

        if(!board){
            throw new NotFoundException(messages.notFound('board', id)) 
        }
        return board
    }
}
