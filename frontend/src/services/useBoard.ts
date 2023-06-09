import { IBoard } from "@/interfaces/IBoard"
import { Api } from "@/providers"

export const useBoard = {
    getAll: async() => await Api.get<IBoard[]>('/boards'),
    post: async(boardDto: IBoard) => await Api.post<IBoard>('/boards', {name: boardDto.name, order: boardDto.order} as IBoard)
}