<template>
    <div>
        <v-expand-x-transition
        class="expand-desktop "
        v-if="state.vuetify.display.smAndUp"
        style=
            "padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 50%;"
        >
            <toggle-color/>
        </v-expand-x-transition>
        <v-expand-transition
            v-else
            style=
                "padding: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;"
            class="expand-mobile"
        >
            <toggle-color/>
        </v-expand-transition>
    </div>
    
 </template>
 
 <script lang="ts" setup>
    import {reactive, watchEffect } from 'vue';
    import {useUpdateColor} from '../../store/updateColor'
    import vuetify from '../../plugins/vuetify';
    import ToggleColor from './ToggleColor.vue';

    const updateColor = useUpdateColor()
    const state = reactive({
        isActive: updateColor.isSetting,
        vuetify
    })

    watchEffect(() => {
        state.isActive = updateColor.isSetting
    })
 
 </script>
 
 <style scoped>
    .expand-desktop{
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        z-index: 10;
    }

    .expand-mobile{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 60px;
    }
    
 </style>