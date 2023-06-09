<template>
  <div>

  </div>
</template>

<script lang="ts">
import { useBoard } from '../services/useBoard';
import { onMounted } from 'vue';

  export default{
    setup: async() => {
      console.log(await useBoard.getAll())
    }
  }
</script>
