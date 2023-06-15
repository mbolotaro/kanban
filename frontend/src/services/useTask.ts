import { ITask, IUpdateTaskDto } from "@/interfaces/ITask"
import { Api } from "@/providers"

export const useTask = {
    getAll: async() => await Api.get<ITask[]>('/tasks'),
    post: async(boardDto: ITask) => await Api.post<Pick<ITask, 'name' & 'order'>>('/tasks', boardDto),
    getOne: async(id: number) => await Api.get<ITask>(`/tasks/${id}`),
    update: async(id: number, body: IUpdateTaskDto) => await Api.patch<ITask>(`/tasks/${id}`, body)
}