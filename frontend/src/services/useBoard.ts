import { IBoard } from "@/interfaces/IBoard"
import { Api } from "@/providers"

export const useBoard = {
    getAll: async() => await Api.get<IBoard[]>('/boards'),
    post: async(boardDto: IBoard) => await Api.post<IBoard>('/boards', {name: boardDto.name, order: boardDto.order} as IBoard),
    getOne: async(id: number) => await Api.get<IBoard>(`/boards/${id}`),
    getStages: async(id: number) => {
        const board = await Api.get(`boards/${id}/stages`)
        return board
    }
}