import {Test, TestingModule} from '@nestjs/testing'
import { TasksController } from '../tasks.controller'
import { TasksService } from '../tasks.service'
import { TaskEntity } from '../entities/task.entity'
import { CreateTaskDto } from '../dto/create-task-dto'
import { UpdateTaskDto } from '../dto/update-task-dto'
import { FindTaskDto } from '../dto/find-task-dto'

const taskList: TaskEntity[] = [
    new TaskEntity({createdAt: '05/19/2023', id: 1, name: 'task-1', order: 0, updatedAt: '05/19/2023', stageId: 1}),
    new TaskEntity({createdAt: '05/19/2023', id: 2, name: 'task-2', order: 1, updatedAt: '05/19/2023', stageId: 2}),
    new TaskEntity({createdAt: '05/19/2023', id: 3, name: 'task-3', order: 2, updatedAt: '05/19/2023', stageId: 3}),
    new TaskEntity({createdAt: '05/19/2023', id: 4, name: 'task-4', order: 3, updatedAt: '05/19/2023', stageId: 4})
]

const findTaskDto: FindTaskDto = {id: taskList[0].id}
const createTaskDto: CreateTaskDto = {name: 'new-task', order: 4, stageId: 1}
const updateTaskDto: UpdateTaskDto = {name: 'task-1:updated'}
const newTaskEntity: TaskEntity = new TaskEntity({name: 'new-task'})
const updatedTask: TaskEntity = new TaskEntity({...taskList[0], name: updateTaskDto.name})

describe('TasksController', ()=> {
    let tasksController: TasksController
    let tasksService: TasksService

    beforeEach(async()=> {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [{
                provide: TasksService,
                useValue: {
                    create: jest.fn().mockResolvedValue(newTaskEntity),
                    findAll: jest.fn().mockResolvedValue(taskList),
                    findBy: jest.fn().mockResolvedValue(taskList[0]),
                    update: jest.fn().mockResolvedValue(updatedTask),
                    delete: jest.fn().mockResolvedValue(undefined)
                }
            }]
        }).compile()

        tasksController = module.get<TasksController>(TasksController)
        tasksService = module.get<TasksService>(TasksService)
    })

    it('should be defined', ()=> {
        expect(tasksController).toBeDefined()
        expect(tasksService).toBeDefined()
    })

    //FIND-ALL
    describe('findAll', () => {
        it('should return a task list successfully', async () => {
            const result = await tasksController.findAll()
            expect(tasksService.findAll).toHaveBeenCalledTimes(1)
            expect(result).toEqual(taskList)
        })
        it('should throw an exception', ()=> {
            jest.spyOn(tasksService, 'findAll').mockRejectedValueOnce(new Error())
            expect(tasksController.findAll()).rejects.toThrowError() 
        })
    })

    //FIND-BY
    describe('findById', () => {
        it('should return a specified task item successfully', async() => {
            const result = await tasksController.findById(findTaskDto)
            expect(tasksService.findBy).toHaveBeenCalledTimes(1)
            expect(tasksService.findBy).toHaveBeenCalledWith(findTaskDto)
            expect(result).toEqual(taskList[0])
        })
        it('should throw an exception', () => {
            jest.spyOn(tasksService, 'findBy').mockRejectedValueOnce(new Error())
            expect(tasksController.findById(findTaskDto)).rejects.toThrowError()
        })

    })

    //CREATE
    describe('create', () => {
        it('should create a new task item successfully', async() => {
            const result = await tasksController.create(createTaskDto)
            expect(tasksService.create).toHaveBeenCalledTimes(1)
            expect(tasksService.create).toHaveBeenCalledWith(createTaskDto)
            expect(result).toEqual(newTaskEntity)
        })
        it('should throw an exception', () => {
            jest.spyOn(tasksService, 'create').mockRejectedValueOnce(new Error())
            expect(tasksController.create(createTaskDto)).rejects.toThrowError()
        })
    })

    //UPDATE
    describe('update', () => {

        it('should update a specified task item successfully', async() => {
            const result = await tasksController.update(findTaskDto, createTaskDto)
            expect(tasksService.update).toHaveBeenCalledTimes(1)
            expect(tasksService.update).toHaveBeenCalledWith(findTaskDto, createTaskDto) 
            expect(result).toEqual(updatedTask)

        })
        it('should throw an exception', () => {
            jest.spyOn(tasksService, 'update').mockRejectedValueOnce(new Error())
            expect(tasksController.update(findTaskDto, createTaskDto)).rejects.toThrowError()
        })
    })

    //DELETE
    describe('deleteById', ()=> {
        it('should delete a specified task item successfully', async()=> {
            const result = await tasksController.deleteById(findTaskDto)
            expect(tasksService.delete).toHaveBeenCalledTimes(1)
            expect(tasksService.delete).toHaveBeenCalledWith(findTaskDto)
            expect(result).toEqual(undefined)
        })
        it('should throw an exception', ()=> {
            jest.spyOn(tasksService, 'delete').mockRejectedValueOnce(new Error())
            expect(tasksController.deleteById(findTaskDto)).rejects.toThrowError()
        })
    })
})