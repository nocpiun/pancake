<script setup lang="ts">
defineProps<{
    class?: string
    id?: string
    title: string
    description?: string
}>();
</script>

<template>
    <section class="w-full flex flex-col">
        <div class="flex justify-between items-end">
            <h2 class="text-2xl font-light inline-block">{{ title }}</h2>
            <span class="text-base text-gray-500">{{ description }}</span>
        </div>
        
        <div :id="id" :class="computedClass" @mousewheel="(e) => mousewheel(e)">
            <slot />
        </div>
    </section>
</template>

<script lang="ts">
export default {
    computed: {
        computedClass() {
            return this.class;
        }
    },
    methods: {
        mousewheel(e: WheelEvent) {
            this.$emit("mousewheel", e);
        }
    }
}
</script>
