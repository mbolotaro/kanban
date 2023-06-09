import {Test, TestingModule} from '@nestjs/testing'
import { BoardsController } from '../boards.controller'
import { BoardsService } from '../boards.service'
import { BoardEntity } from '../entities/boards.entity'
import { CreateBoardDto } from '../dto/create-board-dto'
import { UpdateBoardDto } from '../dto/update-board-dto'
import { FindBoardDto } from '../dto/find-board-dto'

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
const updatedBoard: BoardEntity = new BoardEntity({...boardList[0], name: updateBoardDto.name})

describe('BoardsController', ()=> {
    let boardsController: BoardsController
    let boardsService: BoardsService

    beforeEach(async()=> {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BoardsController],
            providers: [{
                provide: BoardsService,
                useValue: {
                    create: jest.fn().mockResolvedValue(newBoardEntity),
                    findAll: jest.fn().mockResolvedValue(boardList),
                    findBy: jest.fn().mockResolvedValue(boardList[0]),
                    update: jest.fn().mockResolvedValue(updatedBoard),
                    delete: jest.fn().mockResolvedValue(undefined)
                }
            }]
        }).compile()

        boardsController = module.get<BoardsController>(BoardsController)
        boardsService = module.get<BoardsService>(BoardsService)
    })

    it('should be defined', ()=> {
        expect(boardsController).toBeDefined()
        expect(boardsService).toBeDefined()
    })

    //FIND-ALL
    describe('findAll', () => {
        it('should return a board list successfully', async () => {
            const result = await boardsController.findAll()
            expect(boardsService.findAll).toHaveBeenCalledTimes(1)
            expect(result).toEqual(boardList)
        })
        it('should throw an exception', ()=> {
            jest.spyOn(boardsService, 'findAll').mockRejectedValueOnce(new Error())
            expect(boardsController.findAll()).rejects.toThrowError() 
        })
    })

    //FIND-BY
    describe('findById', () => {
        it('should return a specified board item successfully', async() => {
            const result = await boardsController.findById(findBoardDto)
            expect(boardsService.findBy).toHaveBeenCalledTimes(1)
            expect(boardsService.findBy).toHaveBeenCalledWith(findBoardDto)
            expect(result).toEqual(boardList[0])
        })
        it('should throw an exception', () => {
            jest.spyOn(boardsService, 'findBy').mockRejectedValueOnce(new Error())
            expect(boardsController.findById(findBoardDto)).rejects.toThrowError()
        })

    })

    //CREATE
    describe('create', () => {
        it('should create a new board item successfully', async() => {
            const result = await boardsController.create(createBoardDto)
            expect(boardsService.create).toHaveBeenCalledTimes(1)
            expect(boardsService.create).toHaveBeenCalledWith(createBoardDto)
            expect(result).toEqual(newBoardEntity)
        })
        it('should throw an exception', () => {
            jest.spyOn(boardsService, 'create').mockRejectedValueOnce(new Error())
            expect(boardsController.create(createBoardDto)).rejects.toThrowError()
        })
    })

    //UPDATE
    describe('update', () => {

        it('should update a specified board item successfully', async() => {
            const result = await boardsController.update(findBoardDto, createBoardDto)
            expect(boardsService.update).toHaveBeenCalledTimes(1)
            expect(boardsService.update).toHaveBeenCalledWith(findBoardDto, createBoardDto) 
            expect(result).toEqual(updatedBoard)

        })
        it('should throw an exception', () => {
            jest.spyOn(boardsService, 'update').mockRejectedValueOnce(new Error())
            expect(boardsController.update(findBoardDto, createBoardDto)).rejects.toThrowError()
        })
    })

    //DELETE
    describe('deleteById', ()=> {
        it('should delete a specified board item successfully', async()=> {
            const result = await boardsController.deleteById(findBoardDto)
            expect(boardsService.delete).toHaveBeenCalledTimes(1)
            expect(boardsService.delete).toHaveBeenCalledWith(findBoardDto)
            expect(result).toEqual(undefined)
        })
        it('should throw an exception', ()=> {
            jest.spyOn(boardsService, 'delete').mockRejectedValueOnce(new Error())
            expect(boardsController.deleteById(findBoardDto)).rejects.toThrowError()
        })
    })
})