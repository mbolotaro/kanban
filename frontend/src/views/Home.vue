<template>
  <v-container>
    {{ board.name }}
      <task-card :dataTask="board.stages.find(stage => stage.id == 8).tasks.find(task => task.id == 11)" v-if="!loading" :loading="loading"/>
      <color-section/>
  </v-container>
</template>

<script lang="ts">
import { useBoard } from '../services/useBoard';
import TaskCard from '../components/TaskCard.vue'
import { ref, Ref, onBeforeMount } from 'vue';
import { IBoard } from '../interfaces/IBoard';
import ColorSection from '../components/ColorSection/index.vue';
  export default{
  components: { TaskCard, ColorSection },
    name: 'Home',
    setup(){
      const loading: Ref<boolean> = ref(true)
      const board: Ref<IBoard> = ref({
        name: 'not defined',
        order: 0,
        createdAt: '',
        updatedAt: '',
        id: 0,
      } as IBoard)
      onBeforeMount(async()=> {
        try{
          board.value = (await useBoard.getFullBoard(1)).data
          loading.value = false
        }
        catch{

        }
        
      })
      return {board, loading}
    }
  }
  
</script>
