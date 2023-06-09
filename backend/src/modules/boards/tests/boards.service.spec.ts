import {Test, TestingModule} from '@nestjs/testing'
import { BoardsController } from '../boards.controller'
import { BoardsService } from '../boards.service'
import { BoardEntity } from '../entities/boards.entity'
import { CreateBoardDto } from '../dto/create-board-dto'
import { UpdateBoardDto } from '../dto/update-board-dto'
import { FindBoardDto } from '../dto/find-board-dto'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { NotFoundException } from '@nestjs/common/exceptions'

const boardList: BoardEntity[] = [
    new BoardEntity({createdAt: '05/19/2023', id: 1, name: 'board-1', order: 0, stages: [], updatedAt: '05/19/2023'}),
    new BoardEntity({createdAt: '05/19/2023', id: 2, name: 'board-2', order: 1, stages: [], updatedAt: '05/19/2023'}),
    new BoardEntity({createdAt: '05/19/2023', id: 3, name: 'board-3', order: 2, stages: [], updatedAt: '05/19/2023'}),
    new BoardEntity({createdAt: '05/19/2023', id: 4, name: 'board-4', order: 3, stages: [], updatedAt: '05/19/2023'})
]

const findBoardDto: FindBoardDto = {id: boardList[0].id}
const createBoardDto: CreateBoardDto = {name: 'new-board', order: 4}
const updateBoardDto: UpdateBoardDto = {name: 'board-1:updated'}
const newBoardEntity: BoardEntity = new BoardEntity({name: 'new-board'})
const updatedBoardName: BoardEntity = new BoardEntity({...boardList[0], name: updateBoardDto.name})
const updatedBoardOrder: BoardEntity = new BoardEntity({...boardList[0], order: updateBoardDto.order})
const updatedBoard: BoardEntity = new BoardEntity({...boardList[0], ...updateBoardDto})
 
describe('BoardsService', ()=> {
    let boardsService: BoardsService
    let boardsRepository: Repository<BoardEntity>
    beforeEach(async()=> {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardsService,
                {
                    provide: getRepositoryToken(BoardEntity),
                    useValue: {
                        create: jest.fn().mockResolvedValue(newBoardEntity),
                        find: jest.fn().mockResolvedValue(boardList),
                        save: jest.fn().mockResolvedValue(newBoardEntity),
                        findOneByOrFail: jest.fn().mockResolvedValue(boardList[0]),
                        merge: jest.fn(),
                        delete: jest.fn().mockResolvedValue(undefined)
                    }
                }
            ]
        }).compile()
        boardsService = module.get<BoardsService>(BoardsService)
        boardsRepository = module.get<Repository<BoardEntity>>(getRepositoryToken(BoardEntity))
    })
    it('should be defined', ()=> {
        expect(boardsService).toBeDefined()
        expect(boardsRepository).toBeDefined()
    })
    describe('findAll', ()=> {
        it('should return a board list successfully', async()=> {
            const result = await boardsService.findAll()
            expect(boardsRepository.find).toHaveBeenCalledTimes(1)
            expect(result).toEqual(boardList)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(boardsRepository, 'find').mockRejectedValueOnce(new Error())
            expect(boardsService.findAll).rejects.toThrowError()
        })
    })
    describe('findOne', ()=> {
        it('should return a specified board successfully', async()=> {
            const result = await boardsService.findBy(findBoardDto)
            expect(boardsRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(result).toEqual(boardList[0]) 
        })
        it('should throw a not found exception', async()=> {
            jest.spyOn(boardsRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(boardsService.findBy(findBoardDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(boardsRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(boardsService.findBy).rejects.toThrowError()
        })
    })

    describe('update', ()=> {
        it('should update a board name successfully', async()=>{
            jest.spyOn(boardsRepository, 'merge').mockReturnValueOnce(updatedBoardName)
            jest.spyOn(boardsRepository, 'save').mockResolvedValueOnce(updatedBoardName)
            const result = await boardsService.update(findBoardDto, {name: updateBoardDto.name})
            
            expect(boardsRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(boardsRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedBoardName)
        })
        it('should update a board order successfully', async()=>{
            jest.spyOn(boardsRepository, 'merge').mockReturnValueOnce(updatedBoardOrder)
            jest.spyOn(boardsRepository, 'save').mockResolvedValueOnce(updatedBoardOrder)
            const result = await boardsService.update(findBoardDto, {order: updateBoardDto.order})

            expect(boardsRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(boardsRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedBoardOrder) 
        })
        it('should update a board name and order successfully', async()=> {
            jest.spyOn(boardsRepository, 'merge').mockReturnValueOnce(updatedBoard)
            jest.spyOn(boardsRepository, 'save').mockResolvedValue(updatedBoard)
            const result = await boardsService.update(findBoardDto, updateBoardDto)

            expect(boardsRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(boardsRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedBoard)
        })
        it('should throw a not found exception', async()=> {
            jest.spyOn(boardsRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(boardsService.update(findBoardDto, updateBoardDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(boardsRepository, 'save').mockRejectedValueOnce(new Error())
            expect(boardsService.update(findBoardDto, updateBoardDto)).rejects.toThrowError()
        })
    }) 
    describe('delete', ()=> {
        it('should delete a specified board', async()=> {
            const result = await boardsService.delete(findBoardDto)
            expect(boardsRepository.delete).toHaveBeenCalledTimes(1)
            expect(result).toEqual(undefined)
        })
        it('should throw a not found exception', async () => {
            jest.spyOn(boardsRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(boardsService.delete(findBoardDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(boardsRepository, 'delete').mockRejectedValueOnce(new Error())
            expect(boardsService.delete(findBoardDto)).rejects.toThrowError()
        })
    })
})