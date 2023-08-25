<template>
    <Page title="查看文件">
        <Section :title="decodeURIComponent(fileName)">
            <p class="mb-3">文件所有者：{{ fileOwner }}</p>

            <Viewer
                v-if="size <= 52428800"
                :fileExt="fileExt"
                :mime="mime"
                :fileData="fileData"
                :blobURL="blobURL"/>
        </Section>
    </Page>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Buffer } from "buffer";

import Page from "../components/Page.vue";
import Section from "../components/Section.vue";
import Viewer from "../components/Viewer.vue";

import { apiURL } from "../global";
import { FileResponseData } from "../types";

export default {
    components: {
        Page,
        Section,
        Viewer
    },
    data() {
        return {
            fileName: "",
            fileOwner: "",
            fileExt: "",
            mime: "",
            fileData: Buffer.from([]),
            blobURL: "",
            size: 0
        }
    },
    created() {
        axios.get<any, AxiosResponse<FileResponseData>>(apiURL +"/shared/"+ this.$route.params.key).then((res) => {
            if(!res.data.fileName) {
                window.location.href = "/app";
            }

            this.fileName = res.data.fileName;
            this.fileOwner = res.data.fileOwner;
            this.fileExt = res.data.fileExt;
            this.mime = res.data.mime;
            this.fileData = Buffer.from(res.data.data, "binary");
            this.blobURL = URL.createObjectURL(new Blob([this.fileData]));
            this.size = res.data.size;

            if(this.size > 52428800) {
                alert("不支持打开大小大于50Mb的大文件");
            }
        }).catch(() => {
            window.location.href = "/app";
        });
    }
}
</script>
