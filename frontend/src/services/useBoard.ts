import { IBoard } from "@/interfaces/IBoard"
import { Api } from "@/providers"

export const useBoard = {
    getAll: async() => await Api.get<IBoard[]>('/boards'),
    post: async(boardDto: IBoard) => await Api.post<IBoard>('/boards', {name: boardDto.name, order: boardDto.order} as IBoard),
    getOne: async(id: number) => await Api.get<IBoard>(`/boards/${id}`),
    getFullBoard: async(id: number) => await Api.get<IBoard>(`/boards/${id}/full`),
    updateBoard: async(id: number, body: Partial<IBoard>) => await Api.patch<IBoard>(`/boards/${id}`, body)
}