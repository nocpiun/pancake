<script setup lang="ts">
import { DirectoryItemType } from "../types";
import { apiURL } from "../global";
</script>

<template>
    <Page title="共享">
        <Section title="已共享的文件">
            <div class="w-full h-[550px] overflow-y-auto border rounded border-gray-300 flex flex-col overflow-x-hidden">
                <DirectoryItem
                    v-for="(item, key) in sharedList"
                    :name="decodeURIComponent(item.dirPath).replaceAll('\\', '/')"
                    :type="DirectoryItemType.FILE"
                    :time="apiURL +'/shared/'+ item.fileKey"
                    :sharing-mode="true"
                    :key="key"
                    @click="handleOpen(item)"
                    @unshare="handleUnshare(item)"/>
            </div>
        </Section>
    </Page>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";

import Page from "../components/Page.vue";
import Section from "../components/Section.vue";
import DirectoryItem from "../components/DirectoryItem.vue";

import { apiURL } from "../global";
import Utils from "../utils";

const token = Utils.getCookie("token");

interface SharedItem {
    fileKey: string
    ownerToken: string
    path: string
    dirPath: string
}

interface GetSharedListResponseData {
    error: object | null
    list: SharedItem[]
}

interface UnshareResponseData {
    error: object | null
}

export default {
    components: {
        Page,
        Section,
        DirectoryItem
    },
    data() {
        return {
            sharedList: [
                {
                    fileKey: "",
                    ownerToken: "",
                    path: "",
                    dirPath: ""
                }
            ]
        }
    },
    methods: {
        handleOpen(item: SharedItem) {
            window.open(apiURL +"/shared/"+ item.fileKey);
        },

        handleUnshare(item: SharedItem) {
            axios.post<any, AxiosResponse<UnshareResponseData>>(apiURL +"/unshare", {
                token,
                fileKey: item.fileKey
            }).then((res) => {
                if(res.data.error) alert(res.data.error);

                this.refreshSharedList();
            }).catch((err) => {
                alert(err);
            });
        },

        refreshSharedList() {
            axios.get<any, AxiosResponse<GetSharedListResponseData>>(apiURL +"/getSharedList?token="+ encodeURIComponent(token)).then((res) => {
                this.sharedList = res.data.list;
            }).catch((err) => {
                alert(err);
            });
        }
    },
    created() {
        this.refreshSharedList();
    }
}
</script>
