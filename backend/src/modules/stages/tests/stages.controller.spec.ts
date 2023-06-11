import {Test, TestingModule} from '@nestjs/testing'
import { StagesController } from '../stages.controller'
import { StagesService } from '../stages.service'
import { StageEntity } from '../entities/stages.entity'
import { CreateStageDto } from '../dto/create-stage-dto'
import { UpdateStageDto } from '../dto/update-stage-dto'
import { FindStageDto } from '../dto/find-stage-dto'
import { TaskEntity } from 'src/modules/tasks/entities/task.entity'
import { NotFoundException } from '@nestjs/common'

const stageList: StageEntity[] = [
    new StageEntity({createdAt: '05/19/2023', id: 1, name: 'stage-1', order: 0, updatedAt: '05/19/2023'}),
    new StageEntity({createdAt: '05/19/2023', id: 2, name: 'stage-2', order: 1, updatedAt: '05/19/2023'}),
    new StageEntity({createdAt: '05/19/2023', id: 3, name: 'stage-3', order: 2, updatedAt: '05/19/2023'}),
    new StageEntity({createdAt: '05/19/2023', id: 4, name: 'stage-4', order: 3, updatedAt: '05/19/2023'})
]

const findStageDto: FindStageDto = {id: stageList[0].id}
const createStageDto: CreateStageDto = {name: 'new-stage', order: 4, boardId: 1}
const updateStageDto: UpdateStageDto = {name: 'stage-1:updated'}
const newStageEntity: StageEntity = new StageEntity({name: 'new-stage'})
const updatedStage: StageEntity = new StageEntity({...stageList[0], name: updateStageDto.name})
const fullStage: StageEntity = new StageEntity({
    name: 'full-stage', 
    id: 6, 
    tasks: [
        new TaskEntity({name: 'task-1', id: 1}),
        new TaskEntity({name: 'task-2', id: 2})
    ],
    createdAt: '05/19/2023',
    updatedAt: '05/19/2023'
})

describe('StagesController', ()=> {
    let stagesController: StagesController
    let stagesService: StagesService

    beforeEach(async()=> {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StagesController],
            providers: [{
                provide: StagesService,
                useValue: {
                    create: jest.fn().mockResolvedValue(newStageEntity),
                    findAll: jest.fn().mockResolvedValue(stageList),
                    findOneBy: jest.fn().mockResolvedValue(stageList[0]),
                    update: jest.fn().mockResolvedValue(updatedStage),
                    delete: jest.fn().mockResolvedValue(undefined),
                    findFullStage: jest.fn().mockResolvedValue(fullStage)
                }
            }]
        }).compile()

        stagesController = module.get<StagesController>(StagesController)
        stagesService = module.get<StagesService>(StagesService)
    })

    it('should be defined', ()=> {
        expect(stagesController).toBeDefined()
        expect(stagesService).toBeDefined()
    })

    //FIND-ALL
    describe('findAll', () => {
        it('should return a stage list successfully', async () => {
            const result = await stagesController.findAll()
            expect(stagesService.findAll).toHaveBeenCalledTimes(1)
            expect(result).toEqual(stageList)
        })
        it('should throw an exception', ()=> {
            jest.spyOn(stagesService, 'findAll').mockRejectedValueOnce(new Error())
            expect(stagesController.findAll()).rejects.toThrowError() 
        })
    })

    //FIND-BY
    describe('findOneById', () => {
        it('should return a specified stage item successfully', async() => {
            const result = await stagesController.findOneById(findStageDto)
            expect(stagesService.findOneBy).toHaveBeenCalledTimes(1)
            expect(stagesService.findOneBy).toHaveBeenCalledWith(findStageDto)
            expect(result).toEqual(stageList[0])
        })
        it('should throw an exception', () => {
            jest.spyOn(stagesService, 'findOneBy').mockRejectedValueOnce(new Error())
            expect(stagesController.findOneById(findStageDto)).rejects.toThrowError()
        })

    })

    //CREATE
    describe('create', () => {
        it('should create a new stage item successfully', async() => {
            const result = await stagesController.create(createStageDto)
            expect(stagesService.create).toHaveBeenCalledTimes(1)
            expect(stagesService.create).toHaveBeenCalledWith(createStageDto)
            expect(result).toEqual(newStageEntity)
        })
        it('should throw an exception', () => {
            jest.spyOn(stagesService, 'create').mockRejectedValueOnce(new Error())
            expect(stagesController.create(createStageDto)).rejects.toThrowError()
        })
    })

    //UPDATE
    describe('update', () => {

        it('should update a specified stage item successfully', async() => {
            const result = await stagesController.update(findStageDto, createStageDto)
            expect(stagesService.update).toHaveBeenCalledTimes(1)
            expect(stagesService.update).toHaveBeenCalledWith(findStageDto, createStageDto) 
            expect(result).toEqual(updatedStage)

        })
        it('should throw an exception', () => {
            jest.spyOn(stagesService, 'update').mockRejectedValueOnce(new Error())
            expect(stagesController.update(findStageDto, createStageDto)).rejects.toThrowError()
        })
    })

    //DELETE
    describe('deleteById', () => {
        it('should delete a specified stage item successfully', async()=> {
            const result = await stagesController.deleteById(findStageDto)
            expect(stagesService.delete).toHaveBeenCalledTimes(1)
            expect(stagesService.delete).toHaveBeenCalledWith(findStageDto)
            expect(result).toEqual(undefined)
        })
        it('should throw an exception', () => {
            jest.spyOn(stagesService, 'delete').mockRejectedValueOnce(new Error())
            expect(stagesController.deleteById(findStageDto)).rejects.toThrowError()
        })
    }),

    describe('findFullStage', ()=> {
        it('should return a specified full stage', async() => {
            const result = await stagesService.findFullStage({id: fullStage.id})
            expect(result).toEqual(fullStage)
        })
        it('should throw an exception', async() => {
            jest.spyOn(stagesService, 'findFullStage').mockRejectedValueOnce(new Error())
            expect(stagesController.findFullStageById({id: fullStage.id})).rejects.toThrowError()
        })
    })
})