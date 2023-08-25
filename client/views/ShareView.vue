<script setup lang="ts">
import { DirectoryItemType } from "../types";
</script>

<template>
    <Page title="共享">
        <Section title="已共享的文件">
            <p class="mb-3">可将共享链接复制分享给别人使用，或右键文件项目以取消共享</p>

            <div class="w-full h-[550px] overflow-y-auto border rounded border-gray-300 flex flex-col overflow-x-hidden">
                <DirectoryItem
                    v-for="(item, key) in sharedList"
                    :name="decodeURIComponent(item.dirPath).replaceAll('\\', '/')"
                    :type="DirectoryItemType.FILE"
                    :time="item.fileKey"
                    :sharing-mode="true"
                    :key="key"
                    @click="handleOpen(item)"
                    @copy-link="handleCopyLink(item)"
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
            sharedList: []
        }
    },
    methods: {
        handleOpen(item: SharedItem) {
            window.location.href = "/app/shared/"+ item.fileKey;
        },

        async handleCopyLink(item: SharedItem) {
            try {
                await window.navigator.clipboard.writeText(
                    `${window.location.protocol}://${window.location.host}/app/shared/${item.fileKey}`
                );
                alert("复制成功");
            } catch (err) {
                alert(err);
            }
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
