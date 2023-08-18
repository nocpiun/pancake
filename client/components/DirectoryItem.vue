<script setup lang="ts">
import { DirectoryItemType } from "../types";

defineProps<{
    name: string
    type: DirectoryItemType
}>();
</script>

<template>
    <div class="w-full px-4 py-3 border-b border-gray-300 flex transition-colors hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200">
        <span class="w-5/12 pr-4 overflow-hidden text-ellipsis whitespace-nowrap">{{ name }}</span>
        <span class="grow font-light text-sm">{{ type === DirectoryItemType.FILE ? "文件" : "文件夹" }}</span>
        <span class="grow-0 text-gray-400">000000</span>
    </div>
</template>

<script lang="ts">
export default {}
</script>
