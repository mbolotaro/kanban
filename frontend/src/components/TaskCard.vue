<template>
  
    <v-expansion-panels style="background-color: white; width: 300px;">
      <v-expansion-panel class=" rounded-xl border-0 card">
        <v-expansion-panel-title class="card-title"  :style='`background: ${dataTask.color}`' 
        >
          <v-icon icon="mdi-drag-horizontal-variant" class="settings"/>
          <v-text-field @focusout="state.inputs.name.outSetValue()"
          :readonly="!state.inputs.name.enabled"
          :variant="state.inputs.name.variant"
          v-model="state.inputs.name.value"
          @click.stop="state.inputs.name.setValue()"
          density="compact" 
          class="title-input"
          @input="state.inputs.name.save()"
          ></v-text-field>
            <v-icon icon="mdi-palette" size=25 @click.stop="toggleModal()" class="settings"/>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="card-desc" @dblclick="state.inputs.desc.setValue()" background-color="red">
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
  import { onMounted, reactive, ref } from 'vue'
  import { useUpdateColor } from '../store/updateColor'
  import { Input } from '../utils/input'
  export default {
    props: {
      dataTask: {type: Object as () => ITask, required: true}
    },
    setup(props: {dataTask: ITask}){
      const updateColor = useUpdateColor()
      const state = reactive({
        inputs: {
          name: new Input('name', props.dataTask.id),
          desc: new Input('desc', props.dataTask.id)
        },
        
      })
      let activeModal = ref(false)
      
      onMounted(()=>{
          state.inputs.name.value = props.dataTask.name
          props.dataTask.desc? 
          state.inputs.desc.value = props.dataTask.desc:
          state.inputs.desc.value = ''
      })
  
      function toggleModal(value: boolean | null = null){
        updateColor.toggle()
        updateColor.setEntity(props.dataTask, 'task')
      }
      
      return {state, toggleModal, activeModal}
    }
  }
</script>
  
<style scoped>
  .card{
    color: white;
    width: 100px;
    cursor: default;
    background: #2B2A2A;
  }
  .card-title{
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
    cursor: pointer;
  }

  .title-input:deep(input):focus-within{
    cursor: text
  }

  .title-input{
    flex: 1;
    
  }

  .desc-input{
    width: 100%
  }

  .settings{
    opacity: 0;
    transition: .5s;
  }
  .card-title:hover .settings{
    opacity: 100%;
  }
</style>