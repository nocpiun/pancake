<script setup lang="ts">
import { DirectoryItemType } from "../types";
</script>

<template>
    <Page>
        <div
            class="w-full h-72 border rounded border-gray-300 bg-no-repeat shadow-lg hover:cursor-pointer"
            :style="bannerStyle"
            @click="handleClickBanner()">
            <!-- Banner -->
        </div>

        <Section
            id="recommended-list"
            class="w-full h-56 pb-3 space-x-3 overflow-x-auto whitespace-nowrap"
            title="推荐项目"
            description="最近浏览次数较多"
            @mousewheel="handleWheel($event)">
            <RecommendedItem name="TestFile"/>
            <RecommendedItem name="TestFile"/>
        </Section>

        <Section
            class="w-full space-y-3"
            title="文件管理">

            <div class="flex justify-between">
                <div class="space-x-3">
                    <Button text="新建文件夹" type="primary" @click="handleCreateDirectory()"/>
                    <Button text="上传文件" type="primary" @click="handleUpload()"/>
                    <Button v-if="path !== '/'" text="返回上一级" type="primary" @click="handleBack()"/>
                </div>
                <div class="space-x-3">
                    <Button text="刷新" type="primary" @click="handleRefresh()"/>
                </div>
            </div>

            <div
                class="w-full h-[550px] overflow-y-auto border rounded border-gray-300 flex flex-col overflow-x-hidden"
                id="directory-list"
                @contextmenu="handleContextMenu($event)">
                <DirectoryItem
                    v-for="(item, key) in folderList"
                    :name="item.name"
                    :type="DirectoryItemType.FOLDER"
                    :time="item.time"
                    :key="key"
                    @click="handleClickItem(item)"
                    @open="handleOpenItem(item)"
                    @download="handleOpenItem(item, true)"
                    @rename="handleRename(item)"
                    @remove="handleRemove(item)"
                    @share="handleShare(item)"/>
                
                <DirectoryItem
                    v-for="(item, key) in fileList"
                    :name="item.name"
                    :type="DirectoryItemType.FILE"
                    :time="item.time"
                    :key="key"
                    @click="handleClickItem(item)"
                    @open="handleOpenItem(item)"
                    @download="handleOpenItem(item, true)"
                    @rename="handleRename(item)"
                    @remove="handleRemove(item)"
                    @share="handleShare(item)"/>
            </div>
        </Section>
    </Page>
    
    <teleport to="#dialogs">
        <Dialog title="上传到Pancake" ref="uploadDialog">
            <p class="mb-3">上传一个或多个文件，最多同时上传5个文件</p>

            <FilePond
                name="file-upload"
                acceptedFileTypes=""
                label-idle="拖拽文件到此处上传..."
                :max-files="5"
                :allow-multiple="true"
                :allow-file-encode="true"
                :server="apiURL +'/upload?token='+ token +'&path='+ encodeURIComponent(path)"
                @init="() => console.log('Filepond is ready!')"
                @processfile="() => handleFileProcessed()"/>
        </Dialog>
    </teleport>

    <teleport to="#dialogs">
        <Dialog title="共享" ref="shareDialog" @close="handleCloseShareDialog()">
            <p class="mb-3">已为你生成了文件的永久链接，可将链接复制分享给别人使用。</p>
            <p class="mb-3">你也可以在“共享”菜单中取消共享</p>

            <a :href="shareLink" target="_blank" rel="noreferrer" class="block text-center">
                <code class="text-blue-600">{{ shareLink }}</code>
            </a>
        </Dialog>
    </teleport>
</template>

<script lang="ts">
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import Page from "../components/Page.vue";
import Section from "../components/Section.vue";
import Button from "../components/Button.vue";
import RecommendedItem from "../components/RecommendedItem.vue";
import DirectoryItem from "../components/DirectoryItem.vue";
import Dialog from "../components/Dialog.vue";

import { DirectoryItemData } from "../types";
import { apiURL } from '../global';
import Utils from "../utils";

const FilePond = vueFilePond(FilePondPluginImagePreview);

const token = Utils.getCookie("token");

var path = ref<any>("/");
var uploadDialog = ref<any>(null);
var shareDialog = ref<any>(null);

interface DynamicResponseData<D = any> {
    error: object | null
    data: D
}

interface GetDirectoryResponseData {
    error: object | null
    list: DirectoryItemData[]
}

interface FetchKeyResponseData {
    error: object | null
    key: string
}

interface RenameResponseData {
    error: object | null
    pass: boolean
}

export default {
    components: {
        Page,
        Section,
        Button,
        RecommendedItem,
        DirectoryItem,
        Dialog,
        FilePond
    },
    data() {
        return {
            bannerStyle: "",
            bannerLink: "",
            directoryList: [],
            shareLink: ""
        }
    },
    computed: {
        folderList() {
            return this.directoryList.filter((i: DirectoryItemData) => i.type === "directory");
        },

        fileList() {
            return this.directoryList.filter((i: DirectoryItemData) => i.type === "file");
        }
    },
    methods: {
        handleClickBanner() {
            window.open(this.bannerLink);
        },

        handleWheel(e: WheelEvent) {
            var recommendedList = document.getElementById("recommended-list");
            if(!recommendedList) return;
    
            e.deltaY > 0
            ? recommendedList.scrollLeft += 100
            : recommendedList.scrollLeft -= 100;

            e.preventDefault();
        },

        handleContextMenu(e: MouseEvent) {
            if((e.target as HTMLElement).id !== "directory-list") return;
            e.preventDefault();

            this.$contextmenu({
                theme: "mac",
                x: e.x,
                y: e.y,
                items: [
                    { 
                        label: "刷新",
                        divided: "down",
                        onClick: () => {
                            this.refreshDirectory();
                        }
                    },
                    {
                        label: "新建文件夹",
                        onClick: () => {
                            this.handleCreateDirectory();
                        }
                    },
                    {
                        label: "上传...",
                        onClick: () => {
                            this.handleUpload();
                        }
                    }
                ]
            });
        },

        handleCreateDirectory() {
            var dirName = prompt("请输入新文件夹名称");
            if(!dirName || dirName === "") return;

            axios.post(apiURL +"/createDirectory", {
                token,
                path: encodeURIComponent(path.value),
                dirName
            }).then(() => {
                this.refreshDirectory();
            }).catch((err) => {
                alert(err);
            });
        },

        handleUpload() {
            if(!uploadDialog.value) return;

            uploadDialog.value.dialog.showModal();
        },

        handleRename(item: DirectoryItemData) {
            var newName = prompt("请输入新名称", item.name);
            if(!newName || newName === "") return;

            axios.post<any, AxiosResponse<RenameResponseData>>(apiURL +"/rename", {
                token,
                path: encodeURIComponent(path.value),
                oldName: item.name,
                newName
            }).then((res) => {
                if(!res.data.pass) {
                    alert("重命名失败，名称重复");
                    return;
                }

                this.refreshDirectory();
            }).catch((err) => {
                alert(err);
            });
        },

        handleRemove(item: DirectoryItemData) {
            axios.post<any, AxiosResponse<RenameResponseData>>(apiURL +"/remove", {
                token,
                path: encodeURIComponent(path.value),
                name: item.name
            }).then(() => {
                this.refreshDirectory();
            }).catch((err) => {
                alert(err);
            });
        },

        handleShare(item: DirectoryItemData) {
            shareDialog.value.dialog.showModal();

            axios.post<any, AxiosResponse<FetchKeyResponseData>>(apiURL +"/share", {
                token,
                path: encodeURIComponent(path.value),
                fileName: item.name
            }).then(async (res) => {
                if(res.status === 404) return;

                this.shareLink = apiURL +"/shared/"+ res.data.key;
            }).catch((err) => {
                alert(err);
            });
        },

        handleCloseShareDialog() {
            this.shareLink = "";
        },

        handleFileProcessed() {
            this.refreshDirectory();
        },

        handleClickItem(item: DirectoryItemData) {
            switch(item.type) {
                case "directory":
                    path.value += item.name +"/";
                    this.refreshDirectory();
                    break;
                case "file":
                    this.handleOpenItem(item);
                    break;
            }
        },

        handleOpenItem(item: DirectoryItemData, shouldDownload: boolean = false) {
            axios.post<any, AxiosResponse<FetchKeyResponseData>>(apiURL +"/getFileKey", {
                token,
                path: encodeURIComponent(path.value),
                fileName: item.name
            }).then(async (res) => {
                if(res.status === 404) return;

                shouldDownload
                ? window.location.href = apiURL +"/file/"+ res.data.key +"?download=1"
                : window.open(apiURL +"/file/"+ res.data.key, "about:blank");
            }).catch((err) => {
                alert(err);
            });
        },

        handleBack() {
            var currentPath = path.value;
            var pathArr = currentPath.split("/");
            pathArr.pop();
            pathArr[pathArr.length - 1] = "";

            path.value = pathArr.join("/");
            this.refreshDirectory();
        },

        handleRefresh() {
            this.refreshDirectory();
        },

        refreshDirectory() {
            axios.get<
                any, AxiosResponse<GetDirectoryResponseData>
            >(apiURL +"/getDirectory?token="+ token +"&path="+ path.value).then((res) => {
                this.directoryList = res.data.list;
            }).catch((err) => {
                alert(err);
            });
        }
    },
    created() {
        axios.get<
            any, AxiosResponse<DynamicResponseData<{
                url: string
                border: string
                link: string
            }>>
        >(apiURL +"/getDynamic?id=banner").then((res) => {
            this.bannerStyle = "background: url("+ res.data.data.url +"); border-color: "+ res.data.data.border;
            this.bannerLink = res.data.data.link;
        }).catch((err) => { throw err });

        this.refreshDirectory();
    }
}
</script>

<style>
.filepond--credits {
    display: none;
}
</style>
