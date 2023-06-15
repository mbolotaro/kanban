import { IDefault } from "./IDefault";
import { ITask } from "./ITask";

export interface IStage extends IDefault{
    name: string,
    order: number,
    boardId: number,
    color: string,
    tasks: ITask[],
    
}