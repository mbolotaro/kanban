import { IBoard } from "@/interfaces/IBoard"
import { IStage } from "@/interfaces/IStage"
import { ITask } from "@/interfaces/ITask"
import { defineStore } from "pinia"
import { useTask } from "@/services/useTask"

type entityType = ITask | IBoard | IStage | undefined

export const useUpdateColor = defineStore('update-color', {
    state: () => ({ 
      isSetting: false,
      entity: undefined as entityType,
      type: undefined as 'task' | 'stage' | 'board' | undefined
    }),

    actions: {
      toggle(value?: boolean | undefined) {
          this.entity = undefined
        value !== undefined? this.isSetting = value: this.isSetting = !this.isSetting
        
      },
      async setColor(newColor: string){
        if(this.entity !== undefined){
          this.entity.color = newColor
          switch(this.type){
            case 'task':
              await useTask.update(this.entity.id, {color: newColor})
            break 
            case 'stage':
            break
            case 'board': 
            break
            default: {}
          }
        }
      },
      
      setEntity(entity: entityType, type: 'task' | 'stage' | 'board'){
        this.entity = entity
        this.type = type
      }
    },
  })