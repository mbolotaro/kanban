<template>
    <div class="stage-column">
        <div class="header" :style="{color: props.dataStage.color}">{{ props.dataStage.name }}</div>
        <draggable
            :list="props.dataStage.tasks"
            group="stages"
            class="task-list"
            @end="updateOrder($event)"
            itemKey="id"
        >
            <template #item="{element}" class="task-list">
                <task-card :dataTask="element" class="task"></task-card>
            </template>
        </draggable>
    </div>
</template>

<script lang="ts" setup>
    import draggable from 'vuedraggable'
    import TaskCard from './TaskCard.vue'
    import { useTask } from '@/services/useTask';
    import { IStage } from '@/interfaces/IStage';

    const props = defineProps({
        dataStage: {type: Object as () => IStage, required: true}
    })
    async function updateOrder(event: any){
        const id = props.dataStage.tasks.find(task => task.order == event.oldIndex + 1)?.id
        if(id){
            await useTask.update(id, {order: event.newIndex + 1})
        }
    }
</script>

<style scoped>

    .stage-column{
        height: 100%;
        width: fit-content;

    }

    .header{
        font-family: MontSerratExtraBold;
        text-align: center;
        font-size: 24px;

    }
    .task-list{
        display: flex;
        flex-direction: column;
    }
    .task{
        margin-top: 10px;
    }
</style>