import {Test, TestingModule} from '@nestjs/testing'
import { StagesService } from '../stages.service'
import { StageEntity } from '../entities/stage.entity'
import { CreateStageDto } from '../dto/create-stage-dto'
import { UpdateStageDto } from '../dto/update-stage-dto'
import { FindStageDto } from '../dto/find-stage-dto'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { NotFoundException } from '@nestjs/common/exceptions'

const stageList: StageEntity[] = [
    new StageEntity({createdAt: '05/19/2023', id: 1, name: 'stage-1', order: 0, updatedAt: '05/19/2023', boardId: 1}),
    new StageEntity({createdAt: '05/19/2023', id: 2, name: 'stage-2', order: 1, updatedAt: '05/19/2023', boardId: 2}),
    new StageEntity({createdAt: '05/19/2023', id: 3, name: 'stage-3', order: 2, updatedAt: '05/19/2023', boardId: 3}),
    new StageEntity({createdAt: '05/19/2023', id: 4, name: 'stage-4', order: 3, updatedAt: '05/19/2023', boardId: 4})
]

const findStageDto: FindStageDto = {id: stageList[0].id}
const createStageDto: CreateStageDto = {name: 'new-stage', order: 5, boardId: 5}
const updateStageDto: UpdateStageDto = {name: 'stage-1:updated'}
const newStageEntity: StageEntity = new StageEntity({name: 'new-stage'})
const updatedStageName: StageEntity = new StageEntity({...stageList[0], name: updateStageDto.name})
const updatedStageOrder: StageEntity = new StageEntity({...stageList[0], order: updateStageDto.order})
const updatedStage: StageEntity = new StageEntity({...stageList[0], ...updateStageDto})
 
describe('StagesService', ()=> {
    let stagesService: StagesService
    let stagesRepository: Repository<StageEntity>
    beforeEach(async()=> {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StagesService,
                {
                    provide: getRepositoryToken(StageEntity),
                    useValue: {
                        create: jest.fn().mockResolvedValue(newStageEntity),
                        find: jest.fn().mockResolvedValue(stageList),
                        save: jest.fn().mockResolvedValue(newStageEntity),
                        findOneByOrFail: jest.fn().mockResolvedValue(stageList[0]),
                        merge: jest.fn(),
                        delete: jest.fn().mockResolvedValue(undefined)
                    }
                }
            ]
        }).compile()
        stagesService = module.get<StagesService>(StagesService)
        stagesRepository = module.get<Repository<StageEntity>>(getRepositoryToken(StageEntity))
    })
    it('should be defined', ()=> {
        expect(stagesService).toBeDefined()
        expect(stagesRepository).toBeDefined()
    })
    describe('findAll', ()=> {
        it('should return a stage list successfully', async()=> {
            const result = await stagesService.findAll()
            expect(stagesRepository.find).toHaveBeenCalledTimes(1)
            expect(result).toEqual(stageList)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(stagesRepository, 'find').mockRejectedValueOnce(new Error())
            expect(stagesService.findAll).rejects.toThrowError()
        })
    })
    describe('findOne', ()=> {
        it('should return a specified stage successfully', async()=> {
            const result = await stagesService.findBy(findStageDto)
            expect(stagesRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(result).toEqual(stageList[0]) 
        })
        it('should throw a not found exception', async()=> {
            jest.spyOn(stagesRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(stagesService.findBy(findStageDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(stagesRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(stagesService.findBy).rejects.toThrowError()
        })
    })

    describe('update', ()=> {
        it('should update a stage name successfully', async()=>{
            jest.spyOn(stagesRepository, 'merge').mockReturnValueOnce(updatedStageName)
            jest.spyOn(stagesRepository, 'save').mockResolvedValueOnce(updatedStageName)
            const result = await stagesService.update(findStageDto, {name: updateStageDto.name})
            
            expect(stagesRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(stagesRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedStageName)
        })
        it('should update a stage order successfully', async()=>{
            jest.spyOn(stagesRepository, 'merge').mockReturnValueOnce(updatedStageOrder)
            jest.spyOn(stagesRepository, 'save').mockResolvedValueOnce(updatedStageOrder)
            const result = await stagesService.update(findStageDto, {order: updateStageDto.order})

            expect(stagesRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(stagesRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedStageOrder) 
        })
        it('should update a stage name and order successfully', async()=> {
            jest.spyOn(stagesRepository, 'merge').mockReturnValueOnce(updatedStage)
            jest.spyOn(stagesRepository, 'save').mockResolvedValue(updatedStage)
            const result = await stagesService.update(findStageDto, updateStageDto)

            expect(stagesRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(stagesRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedStage)
        })
        it('should throw a not found exception', async()=> {
            jest.spyOn(stagesRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(stagesService.update(findStageDto, updateStageDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(stagesRepository, 'save').mockRejectedValueOnce(new Error())
            expect(stagesService.update(findStageDto, updateStageDto)).rejects.toThrowError()
        })
    }) 
    describe('delete', ()=> {
        it('should delete a specified stage', async()=> {
            const result = await stagesService.delete(findStageDto)
            expect(stagesRepository.delete).toHaveBeenCalledTimes(1)
            expect(result).toEqual(undefined)
        })
        it('should throw a not found exception', async () => {
            jest.spyOn(stagesRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(stagesService.delete(findStageDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(stagesRepository, 'delete').mockRejectedValueOnce(new Error())
            expect(stagesService.delete(findStageDto)).rejects.toThrowError()
        })
    })
})