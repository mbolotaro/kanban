import { ITask } from "@/interfaces/ITask"
import { useTask } from "@/services/useTask"

export class Input {
    constructor(property: keyof ITask, taskId: number){
      this.property = property
      this.taskId = taskId
    }
    public value: string = ''
    public variant: 'plain' | 'underlined' = 'plain'
    public enabled: boolean = false
    public debounce: any = null
    public property: keyof ITask
    public debounceDelay: number = 1000
    public taskId: number
    public setValue(){
      this.variant = 'underlined'
      setTimeout(()=>{
        this.enabled = true
      }, 100)
      
    }
    public outSetValue(){
      setTimeout(()=>{
        this.enabled = false
        this.variant = 'plain'
      }, 100)
    }
    public save(){
        clearTimeout(this.debounce)
        this.debounce = setTimeout(async ()=> {
          await useTask.update(this.taskId, {[this.property]: this.value})
        }, this.debounceDelay)
    }
  }