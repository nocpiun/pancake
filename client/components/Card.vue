<script setup lang="ts">
defineProps<{
    class?: string
}>();
</script>

<template>
    <div :class="'border rounded border-gray-300 bg-slate-100 shadow-lg '+ computedClass">
        <slot />
    </div>
</template>

<script lang="ts">
export default {
    computed: {
        computedClass() {
            return this.class;
        }
    }
}
</script>
