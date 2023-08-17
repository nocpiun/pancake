<script setup lang="ts">
defineProps<{
    name: string
    // image: string
}>();
</script>

<template>
    <Card class="w-80 h-full m-0 inline-flex flex-col overflow-hidden hover:cursor-pointer hover:bg-slate-200">
        <div class="grow bg-cyan-900">

        </div>
        <div class="h-[75px] px-4 py-3">
            <p class="font-semibold">{{ name }}</p>
        </div>
    </Card>
</template>

<script lang="ts">
import Card from "./Card.vue";

export default {
    components: {
        Card
    }
}
</script>

