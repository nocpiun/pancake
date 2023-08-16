<script setup lang="ts">
defineProps<{
    label: string
    safe?: boolean
}>();
</script>

<template>
    <div class="h-16 mt-3">
        <span class="text-[15px] mx-2 text-gray-700">{{ label }}</span>
        <input
            class="w-full h-[40px] mt-1 border rounded border-gray-300 px-3 py-2 transition-colors focus:outline-none focus:border-gray-400 selection:bg-opacity-60 selection:bg-blue-300"
            autocomplete="off"
            :type="safe ? 'password' : 'text'"/>
    </div>
</template>

<script lang="ts">
export default {}
</script>
