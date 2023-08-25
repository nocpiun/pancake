<script setup lang="ts">
import { DirectoryItemType } from "../types";

defineProps<{
    name: string
    type: DirectoryItemType
    time: string
    sharingMode?: boolean
}>();
</script>

<template>
    <div
        class="w-full px-4 py-3 border-b border-gray-300 flex transition-colors hover:cursor-pointer hover:bg-slate-100 active:bg-slate-200"
        @contextmenu="handleContextMenu($event)">
        <span class="w-5/12 pr-4 overflow-hidden text-ellipsis whitespace-nowrap">{{ name }}</span>
        <span class="grow font-light text-sm">{{ !sharingMode ? (type === DirectoryItemType.FILE ? "文件" : "文件夹") : "" }}</span>
        <span class="grow-0 text-gray-400">{{ time }}</span>
    </div>
</template>

<script lang="ts">
import { DirectoryItemType } from "../types";

export default {
    data() {
        return {
            // Context Menu
            show: false,
            optionsComponent: {
                zIndex: 3,
                minWidth: 230,
                x: 500,
                y: 200
            }
        }  
    },
    methods: {
        handleContextMenu(e: MouseEvent) {
            e.preventDefault();

            if(this.sharingMode) { // ShareView
                this.$contextmenu({
                    theme: "mac",
                    x: e.x,
                    y: e.y,
                    items: [
                        {
                            label: "打开",
                            divided: "down",
                            onClick: () => {
                                this.$emit("click");
                            }
                        },
                        {
                            label: "复制链接",
                            onClick: () => {
                                this.$emit("copy-link");
                            }
                        },
                        {
                            label: "取消共享",
                            onClick: () => {
                                this.$emit("unshare");
                            }
                        }
                    ]
                });
                return;
            }
            
            switch(this.type) {
                case DirectoryItemType.FILE:
                    this.$contextmenu({
                        theme: "mac",
                        x: e.x,
                        y: e.y,
                        items: [
                            {
                                label: "打开",
                                shortcut: "一次性链接",
                                onClick: () => {
                                    this.$emit("open");
                                }
                            },
                            {
                                label: "下载",
                                shortcut: "一次性链接",
                                onClick: () => {
                                    this.$emit("download");
                                }
                            },
                            {
                                label: "共享",
                                divided: "down",
                                onClick: () => {
                                    this.$emit("share");
                                }
                            },
                            {
                                label: "重命名", 
                                onClick: () => {
                                    this.$emit("rename");
                                }
                            },
                            {
                                label: "删除", 
                                onClick: () => {
                                    this.$emit("remove");
                                }
                            }
                        ]
                    });
                    break;
                case DirectoryItemType.FOLDER:
                this.$contextmenu({
                        theme: "mac",
                        x: e.x,
                        y: e.y,
                        items: [
                            {
                                label: "重命名",
                                clickClose: true,
                                onClick: () => {
                                    this.$emit("rename");
                                }
                            },
                            {
                                label: "删除", 
                                onClick: () => {
                                    this.$emit("remove");
                                }
                            }
                        ]
                    });
                    break;
            }
        }
    }
}
</script>
