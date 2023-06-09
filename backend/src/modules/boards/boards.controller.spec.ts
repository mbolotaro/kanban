import {Test, TestingModule} from '@nestjs/testing'
import { BoardsController } from './boards.controller'
import { BoardsService } from './boards.service'
import { BoardEntity } from './boards.entity'
import { CreateBoardDto } from './dto/create-board-dto'
import { UpdateBoardDto } from './dto/update-board-dto'

const boardEntityList: BoardEntity[] = [
    new BoardEntity({createdAt: '05/19/2023', id: 'uuid:example-1', name: 'board-1', order: 0, stages: [], updatedAt: '05/19/2023'}),
    new BoardEntity({createdAt: '05/19/2023', id: 'uuid:example-2', name: 'board-2', order: 1, stages: [], updatedAt: '05/19/2023'}),
    new BoardEntity({createdAt: '05/19/2023', id: 'uuid:example-3', name: 'board-3', order: 2, stages: [], updatedAt: '05/19/2023'}),
    new BoardEntity({createdAt: '05/19/2023', id: 'uuid:example-4', name: 'board-4', order: 3, stages: [], updatedAt: '05/19/2023'})
]

const newBoardEntity: BoardEntity = new BoardEntity({name: 'new-board'})

const updatedBoardEntity: BoardEntity = new BoardEntity({name: 'updated-board'})

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
                    findAll: jest.fn().mockResolvedValue(boardEntityList),
                    findBy: jest.fn().mockResolvedValue(boardEntityList[0]),
                    update: jest.fn().mockResolvedValue(updatedBoardEntity),
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
        it('should return a boards list successfully', async () => {
            const result = await boardsController.findAll()
            expect(boardsService.findAll).toHaveBeenCalledTimes(1)
            expect(result).toEqual(boardEntityList)
        })
        it('should throw an exception', ()=> {
            jest.spyOn(boardsService, 'findAll').mockRejectedValueOnce(new Error())
            expect(boardsController.findAll()).rejects.toThrowError() 
        })
    })

    //FIND-BY
    describe('findById', () => {
        const id = 'uuid:example-1'
        it('should return a specified board item successfully', async() => {
            const result = await boardsController.findById({id})
            expect(boardsService.findBy).toHaveBeenCalledTimes(1)
            expect(boardsService.findBy).toHaveBeenCalledWith({id})
            expect(result).toEqual(boardEntityList[0])
        })
        it('should throw an exception', () => {
            jest.spyOn(boardsService, 'findBy').mockRejectedValueOnce(new Error())
            expect(boardsController.findById({id})).rejects.toThrowError()
        })

    })

    //CREATE
    describe('create', () => {
        const body: CreateBoardDto = {
            name: 'new-board'
        }
        it('should create a new board item successfully', async() => {
            const result = await boardsController.create(body)
            expect(boardsService.create).toHaveBeenCalledTimes(1)
            expect(boardsService.create).toHaveBeenCalledWith(body)
            expect(result).toEqual(newBoardEntity)
        })
        it('should throw an exception', () => {
            jest.spyOn(boardsService, 'create').mockRejectedValueOnce(new Error())
            expect(boardsController.create(body)).rejects.toThrowError()
        })
    })

    //UPDATE
    describe('update', () => {
        const id = 'uuid:example-1'
        const body: UpdateBoardDto = {
            name: 'updated-board'
        }

        it('should update a specified board item successfully', async() => {
            const result = await boardsController.update({id}, body)
            expect(boardsService.update).toHaveBeenCalledTimes(1)
            expect(boardsService.update).toHaveBeenCalledWith({id}, body) 
            expect(result).toEqual(updatedBoardEntity)

        })
        it('should throw an exception', () => {
            jest.spyOn(boardsService, 'update').mockRejectedValueOnce(new Error())
            expect(boardsController.update({id}, body)).rejects.toThrowError()
        })
    })

    //DELETE
    describe('deleteById', ()=> {
        const id = 'uuid:example-1'
        it('should delete a specified board item successfully', async()=> {
            const result = await boardsController.deleteById({id})
            expect(boardsService.delete).toHaveBeenCalledTimes(1)
            expect(boardsService.delete).toHaveBeenCalledWith({id})
            expect(result).toEqual(undefined)
        })
        it('should throw an exception', ()=> {
            jest.spyOn(boardsService, 'delete').mockRejectedValueOnce(new Error())
            expect(boardsController.deleteById({id})).rejects.toThrowError()
        })
    })
})