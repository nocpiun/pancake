<script setup lang="ts">
defineProps<{
    title: string
}>();
</script>

<template>
    <div class="w-full px-96 py-16 space-y-10">
        <h1 class="text-4xl font-semibold">{{ title }}</h1>
        <slot />
    </div>
</template>

<script lang="ts">
export default {}
</script>
