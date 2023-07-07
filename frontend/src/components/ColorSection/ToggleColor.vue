<template>
  <v-btn-toggle
            elevation="5"
            v-show="isActive"
            class="button-toggle"
            >
                <v-btn
                    v-for="color in colors"
                    :key="color"
                    @click="updateColor.setColor(color)"
                    :style="`background-color: ${color}; margin: 2px; flex: 1; margin: 5px`"
                    value='#FF0000'
                ></v-btn>
             </v-btn-toggle>
</template>

<script lang="ts" setup>
    import {Ref, ref, watchEffect } from 'vue';
    import {palette} from '../../palette'
    import {useUpdateColor} from '../../store/updateColor'

    const isActive: Ref<boolean> = ref(false)
    const updateColor = useUpdateColor()
    const colors = Object.values(palette)
    
    watchEffect(() => {
        isActive.value = updateColor.isSetting
    })
</script>
