import { IDefault } from "./IDefault";

export interface ITask extends IDefault{
    name: string,
    order: number,
    stageId: number
    color: string,
    desc: string,
}

export interface ICreateTaskDto extends ITask{}

export interface IUpdateTaskDto extends Partial<ICreateTaskDto>{}