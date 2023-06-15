<template>
  
  <v-expansion-panels style="background-color: white; width: 300px;" @update:modelValue.stop>
    <v-expansion-panel class=" rounded-xl card ">
      <v-expansion-panel-title class="card-title"  :style='`background: ${dataTask.color}`' 
      >
        <v-text-field @focusout="state.inputs.name.outSetValue()"
        :readonly="!state.inputs.name.enabled"
        :variant="state.inputs.name.variant"
        v-model="state.inputs.name.value"
        @click.stop="state.inputs.name.setValue()"
        density="compact" 
        class="title-input"
        @input="state.inputs.name.save()"
        ></v-text-field>
        <v-icon icon="mdi-palette" size=25></v-icon>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="card-desc" @dblclick="state.inputs.desc.setValue()">
        <v-textarea @focusout="state.inputs.desc.outSetValue()"
        :readonly="!state.inputs.desc.enabled"
        :variant="state.inputs.desc.variant"
        v-model="state.inputs.desc.value"
        density="compact"
        class="desc-input"
        auto-grow
        @input="state.inputs.desc.save()"
    
        ></v-textarea>
    
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { ITask } from '../interfaces/ITask'
import { onMounted, reactive } from 'vue'
import { useTask } from '../services/useTask'

export default {
  props: {
    dataTask: {type: Object as () => ITask, required: true}
  },
  setup(props: {dataTask: ITask}){
    class Input {
      constructor(property: keyof ITask){
        this.property = property
      }
      public value: string = ''
      public variant: 'plain' | 'underlined' = 'plain'
      public enabled: boolean = false
      public debounce: any = null
      public property: keyof ITask
     
      public setValue(){
        this.variant = 'underlined'
        setTimeout(()=>{
          this.enabled = true
        },100)
        
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
            await useTask.update(props.dataTask.id, {[this.property]: this.value})
          }, 1000)
      }
    }
    const state = reactive({
      inputs: {
        name: new Input('name'),
        desc: new Input('desc')
      },
    })
  
    onMounted(()=>{
      state.inputs.name.value = props.dataTask.name
      props.dataTask.desc? 
        state.inputs.desc.value = props.dataTask.desc:
        state.inputs.desc.value = ''
    })
    return {state}
  },
}
</script>

<style scoped>
  .card{
    background: #2B2A2A;
    color: white;
    width: 100px;
    
    cursor: default;
  }
  .card-title{
    background: #CD5702;
    text-align: center;
    font-size: 18px;
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .card-desc{
    font-size: 16px;
    
  }

  .title-input:deep(input){
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 10px;
    font-family: MontSerratExtraBold;
    width: 100%;
  }

  .title-input{
    width: 100%;
  }

  .desc-input{
    width: 100%
  }
</style>