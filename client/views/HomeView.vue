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
            @mousewheel="(e) => handleWheel(e)">
            <RecommendedItem name="TestFile"/>
            <RecommendedItem name="TestFile"/>
        </Section>

        <Section
            class="w-full space-y-3"
            title="文件管理">

            <div class="flex justify-between">
                <div class="space-x-3">
                    <Button text="新建文件夹" type="success" @click="handleCreateDirectory()"/>
                    <Button text="上传文件" type="success" @click="handleUpload()"/>
                    <Button text="返回上一级" type="primary" @click="handleBack()"/>
                </div>
                <div class="space-x-3">
                    <Button text="下载" type="primary"/>
                    <Button text="共享" type="primary"/>
                </div>
            </div>

            <div class="w-full h-[550px] overflow-y-auto border rounded border-gray-300 flex flex-col overflow-x-hidden">
                <DirectoryItem
                    v-for="(item, key) in directoryList"
                    :name="item.name"
                    :type="item.type === 'directory' ? DirectoryItemType.FOLDER : DirectoryItemType.FILE"
                    :time="item.time"
                    :key="key"
                    @click="handleClickItem(item)"/>
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

import Emitter from "../emitter";
import { DirectoryItemData } from "../types";
import { apiURL } from '../global';
import Utils from "../utils";

const FilePond = vueFilePond(FilePondPluginImagePreview);

const token = Utils.getCookie("token");

var path = ref<any>("/");
var uploadDialog = ref<any>(null);

interface DynamicResponseData<D = any> {
    error: object | null
    data: D
}

interface GetDirectoryResponseData {
    error: object | null
    list: DirectoryItemData[]
}

interface createDirectoryResponseData {
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
            handleClickBanner(): void {
                window.location.href = this.bannerLink;
            }
        }
    },
    methods: {
        handleWheel(e: WheelEvent) {
            var recommendedList = document.getElementById("recommended-list");
            if(!recommendedList) return;
    
            e.deltaY > 0
            ? recommendedList.scrollLeft += 100
            : recommendedList.scrollLeft -= 100;

            e.preventDefault();
        },

        handleCreateDirectory() {
            var dirName = prompt("请输入新文件夹名称");
            if(!dirName || dirName === "") return;

            axios.post<any, AxiosResponse<createDirectoryResponseData>>(apiURL +"/createDirectory", {
                token,
                path: encodeURIComponent(path.value),
                dirName
            }).then((res) => {
                if(!res.data.pass) {
                    alert("文件夹名称重复");
                    return;
                }

                Emitter.get().emit("directory-update");
            }).catch((err) => {
                alert(err);
            });
        },

        handleUpload() {
            if(!uploadDialog.value) return;

            uploadDialog.value.dialog.showModal();
        },

        handleFileProcessed() {
            Emitter.get().emit("directory-update");
        },

        handleClickItem(item: DirectoryItemData) {
            switch(item.type) {
                case "directory":
                    path.value += item.name +"/";
                    Emitter.get().emit("directory-update");
                    break;
                case "file":
                    /** @todo */
                    break;
            }
        },

        handleBack() {
            var currentPath = path.value;
            var pathArr = currentPath.split("/");
            pathArr.pop();
            pathArr[pathArr.length - 1] = "";

            path.value = pathArr.join("/");
            Emitter.get().emit("directory-update");
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

        const refreshDirectory = () => {
            axios.get<
                any, AxiosResponse<GetDirectoryResponseData>
            >(apiURL +"/getDirectory?token="+ token +"&path="+ path.value).then((res) => {
                this.directoryList = res.data.list;
            }).catch((err) => {
                alert(err);
            });
        };

        Emitter.get().on("directory-update", () => refreshDirectory());

        refreshDirectory();
    }
}
</script>

<style>
.filepond--credits {
    display: none;
}
</style>
