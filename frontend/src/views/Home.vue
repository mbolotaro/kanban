<template>
  <v-container style="height: 100%;">
    {{ board.name }}
    <stage-column :data-stage="board.stages[1]"/>  
    <color-section/>
  </v-container>
</template>

<script lang="ts" setup>
  import { useBoard } from '../services/useBoard';
  import { ref, Ref, onBeforeMount } from 'vue';
  import { IBoard } from '../interfaces/IBoard';
  import ColorSection from '../components/ColorSection/index.vue';
  import StageColumn from '../components/StageColumn.vue';

  const loading: Ref<boolean> = ref(true)
  const board: Ref<IBoard> = ref({
    name: 'not defined',
    order: 0,
    createdAt: '',
    updatedAt: '',
    id: 0,
    stages: [{}, {}]
  } as IBoard)
  onBeforeMount(async()=> {
    board.value = (await useBoard.getFullBoard(1)).data
    loading.value = false
  })
</script>
