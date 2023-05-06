import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board-dto';
import { FindBoardDto } from './dto/find-board-dto';
import { UpdateBoardDto } from './dto/update-board-dto';

@Injectable()
export class BoardsService {
    constructor( 
        @InjectRepository(Board)
        private readonly boardsRepository: Repository<Board>
    ){}

    async create(createBoardDto: CreateBoardDto){
        try{
            const board = await this.boardsRepository.save(this.boardsRepository.create(createBoardDto))
            return board
        }
        catch(error){
            throw new BadRequestException()
        }
    }

    async find(){
        return await this.boardsRepository.find()
    }

    async findById(findBoardDto: FindBoardDto){
        try{
            return await this.boardsRepository.findOneByOrFail(findBoardDto)
        }
        catch(error){
            throw new NotFoundException('Board not found!')
        }
        
    }

    async update(findBoardDto: FindBoardDto, updateBoardDto: UpdateBoardDto){
        const board = await this.findById(findBoardDto)
        try{
            return await this.boardsRepository.save(this.boardsRepository.merge(board, updateBoardDto))
        }
        catch(error){
            throw new BadRequestException()
        }
    }

    async delete(findBoardDto: FindBoardDto){
        const board = await this.findById(findBoardDto)
        return await this.boardsRepository.delete(board)
    }

}
