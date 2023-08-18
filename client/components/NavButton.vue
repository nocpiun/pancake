<script setup lang="ts">
const props = defineProps<{
    text: string
    link?: string
    tooltip?: string
}>();

function handleClick(): void {
    if(!props.link) return;

    window.location.href = props.link;
}
</script>

<template>
    <button class="hover:text-gray-300 transition-colors" :title="tooltip" @click="handleClick()">{{ text }}</button>
</template>

<script lang="ts">
export default {}
</script>
