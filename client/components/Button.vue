<script setup lang="ts">
const props = defineProps<{
    class?: string
    text: string
    type: "primary" | "success" | "danger"
}>();

function colorType(): string {
    switch(props.type) {
        case "primary":
            return "bg-white border-gray-300 text-black hover:bg-slate-100 active:bg-slate-200";
        case "success":
            return "bg-green-600 border-green-800 text-white hover:bg-green-700 active:bg-green-800";
        case "danger":
            return "bg-red-600 border-red-800 text-white hover:bg-red-700 active:bg-red-800";
    }
}
</script>

<template>
    <button :class="'h-[40px] px-3 border rounded transition-colors '+ colorType() +' '+ (computedClass ?? '')">
        {{ text }}
    </button>
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
