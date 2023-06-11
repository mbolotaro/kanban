<template>
  <div>

  </div>
</template>

<script lang="ts">
import { IBoard } from '../interfaces/IBoard';
import { useBoard } from '../services/useBoard';

  export default{
    setup: async() => {
      console.log(await useBoard.getStages(1))
    }
  }
</script>
