import { IDefault } from "./IDefault";
import { IStage } from "./IStage";

export interface IBoard extends IDefault{
    name: string,
    order?: number,
    stages: IStage[]
}