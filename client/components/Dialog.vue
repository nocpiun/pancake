<script setup lang="ts">
import { ref } from "vue";

var dialog = ref<HTMLDialogElement | null>(null);

defineProps<{
    title: string
}>();

defineExpose({
    dialog
});

const emit = defineEmits([
    "close"
]);

function handleClose(): void {
    dialog.value?.close();
    emit("close");
}
</script>

<template>
    <dialog class=" w-[700px] h-[500px] p-5 rounded shadow-2xl backdrop:bg-[rgba(0,0,0,0.2)] flex flex-col" ref="dialog">
        <header class="h-20 p-7 pb-0">
            <h1 class="text-3xl font-semibold">{{ title }}</h1>
        </header>
        <div class="flex-1 p-9 pt-3 mb-5 overflow-x-auto">
            <slot />
        </div>
        <footer class="flex justify-end">
            <Button text="关闭" type="primary" @click="handleClose()"/>
        </footer>
    </dialog>
</template>

<script lang="ts">
import Button from "./Button.vue";

export default {
    components: {
        Button
    }
}
</script>

<style scoped>
dialog {
    display: none;
}

dialog[open] {
    display: flex;
}
</style>
