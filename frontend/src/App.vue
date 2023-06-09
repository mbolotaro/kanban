<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script lang="ts">
  import { RouterView } from 'vue-router';
  export default{
    name: 'App',
    components: {RouterView}
  }
</script>
