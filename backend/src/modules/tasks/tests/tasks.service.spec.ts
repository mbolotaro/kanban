import {Test, TestingModule} from '@nestjs/testing'
import { TasksService } from '../tasks.service'
import { TaskEntity } from '../entities/task.entity'
import { CreateTaskDto } from '../dto/create-task-dto'
import { UpdateTaskDto } from '../dto/update-task-dto'
import { FindTaskDto } from '../dto/find-task-dto'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions'

const taskList: TaskEntity[] = [
    new TaskEntity({createdAt: '05/19/2023', id: 1, name: 'task-1', order: 0, updatedAt: '05/19/2023', stageId: 1}),
    new TaskEntity({createdAt: '05/19/2023', id: 2, name: 'task-2', order: 1, updatedAt: '05/19/2023', stageId: 2}),
    new TaskEntity({createdAt: '05/19/2023', id: 3, name: 'task-3', order: 2, updatedAt: '05/19/2023', stageId: 3}),
    new TaskEntity({createdAt: '05/19/2023', id: 4, name: 'task-4', order: 3, updatedAt: '05/19/2023', stageId: 4})
]

const findTaskDto: FindTaskDto = {id: taskList[0].id}
const createTaskDto: CreateTaskDto = {name: 'new-task', order: 5, stageId: 5}
const updateTaskDto: UpdateTaskDto = {name: 'task-1:updated'}
const newTaskEntity: TaskEntity = new TaskEntity(createTaskDto)
const updatedTaskName: TaskEntity = new TaskEntity({...taskList[0], name: updateTaskDto.name})
const updatedTaskOrder: TaskEntity = new TaskEntity({...taskList[0], order: updateTaskDto.order})
const updatedTask: TaskEntity = new TaskEntity({...taskList[0], ...updateTaskDto})
 
describe('TasksService', ()=> {
    let tasksService: TasksService
    let tasksRepository: Repository<TaskEntity>
    beforeEach(async()=> {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getRepositoryToken(TaskEntity),
                    useValue: {
                        create: jest.fn().mockResolvedValue(newTaskEntity),
                        find: jest.fn().mockResolvedValue(taskList),
                        save: jest.fn().mockResolvedValue(newTaskEntity),
                        findOneByOrFail: jest.fn().mockResolvedValue(taskList[0]),
                        merge: jest.fn(),
                        delete: jest.fn().mockResolvedValue(undefined)
                    }
                }
            ]
        }).compile()
        tasksService = module.get<TasksService>(TasksService)
        tasksRepository = module.get<Repository<TaskEntity>>(getRepositoryToken(TaskEntity))
    })
    it('should be defined', ()=> {
        expect(tasksService).toBeDefined()
        expect(tasksRepository).toBeDefined()
    })
    describe('findAll', ()=> {
        it('should return a task list successfully', async()=> {
            const result = await tasksService.findAll()
            expect(tasksRepository.find).toHaveBeenCalledTimes(1)
            expect(result).toEqual(taskList)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(tasksRepository, 'find').mockRejectedValueOnce(new Error())
            expect(tasksService.findAll).rejects.toThrowError()
        })
    })
    describe('findOne', ()=> {
        it('should return a specified task successfully', async()=> {
            const result = await tasksService.findOneBy(findTaskDto)
            expect(tasksRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(result).toEqual(taskList[0]) 
        })
        it('should throw a not found exception', async()=> {
            jest.spyOn(tasksRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(tasksService.findOneBy(findTaskDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(tasksRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(tasksService.findOneBy).rejects.toThrowError()
        })
    })

    describe('create', () => {
        it('should create a task successfully', async() => {
            const result = await tasksService.create(createTaskDto)
            expect(result).toEqual(newTaskEntity)
        })
        it('should throw a bad request exception', async() => {
            jest.spyOn(tasksRepository, 'save').mockRejectedValueOnce(new Error())
            expect(tasksService.create(createTaskDto)).rejects.toThrowError(BadRequestException)
        })
        it('should throw a bad request exception', async() => {
            jest.spyOn(tasksRepository, 'save').mockRejectedValueOnce(new Error())
            expect(tasksService.create(createTaskDto)).rejects.toThrowError()
        })
    })
    describe('update', ()=> {
        it('should update a task name successfully', async()=>{
            jest.spyOn(tasksRepository, 'merge').mockReturnValueOnce(updatedTaskName)
            jest.spyOn(tasksRepository, 'save').mockResolvedValueOnce(updatedTaskName)
            const result = await tasksService.update(findTaskDto, {name: updateTaskDto.name})
            
            expect(tasksRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(tasksRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedTaskName)
        })
        it('should update a task order successfully', async()=>{
            jest.spyOn(tasksRepository, 'merge').mockReturnValueOnce(updatedTaskOrder)
            jest.spyOn(tasksRepository, 'save').mockResolvedValueOnce(updatedTaskOrder)
            const result = await tasksService.update(findTaskDto, {order: updateTaskDto.order})

            expect(tasksRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(tasksRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedTaskOrder) 
        })
        it('should update a task name and order successfully', async()=> {
            jest.spyOn(tasksRepository, 'merge').mockReturnValueOnce(updatedTask)
            jest.spyOn(tasksRepository, 'save').mockResolvedValue(updatedTask)
            const result = await tasksService.update(findTaskDto, updateTaskDto)

            expect(tasksRepository.findOneByOrFail).toHaveBeenCalledTimes(1)
            expect(tasksRepository.save).toHaveBeenCalledTimes(1)
            expect(result).toEqual(updatedTask)
        })
        it('should throw a not found exception', async()=> {
            jest.spyOn(tasksRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(tasksService.update(findTaskDto, updateTaskDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(tasksRepository, 'save').mockRejectedValueOnce(new Error())
            expect(tasksService.update(findTaskDto, updateTaskDto)).rejects.toThrowError()
        })
    }) 
    describe('delete', ()=> {
        it('should delete a specified task', async()=> {
            const result = await tasksService.delete(findTaskDto)
            expect(tasksRepository.delete).toHaveBeenCalledTimes(1)
            expect(result).toEqual(undefined)
        })
        it('should throw a not found exception', async () => {
            jest.spyOn(tasksRepository, 'findOneByOrFail').mockRejectedValueOnce(new Error())
            expect(tasksService.delete(findTaskDto)).rejects.toThrowError(NotFoundException)
        })
        it('should throw an exception', async()=> {
            jest.spyOn(tasksRepository, 'delete').mockRejectedValueOnce(new Error())
            expect(tasksService.delete(findTaskDto)).rejects.toThrowError()
        })
    })
})