<script setup lang="ts">
import "../style/github-markdown-light.min.css";
import "../style/github-light-default.css";

defineProps<{
    fileExt: string
    mime: string
    fileData: Buffer
    blobURL: string
}>();
</script>

<template>
    <code v-if="
        (mime.indexOf('text/') > -1 ||
        fileExt === 'json') &&
        fileExt !== 'md'">
        <pre class="h-screen border rounded border-gray-300 p-3 overflow-auto">{{ fileData.toString("utf-8") }}</pre>
    </code>
    <div v-if="fileExt === 'md'" v-html="md.render(fileData.toString('utf-8'))" class="h-screen overflow-y-auto markdown-body"></div>
    <img v-if="
        fileExt === 'png' ||
        fileExt === 'jpg' ||
        fileExt === 'jpeg' ||
        fileExt === 'svg' ||
        fileExt === 'ico' ||
        fileExt === 'webp' ||
        fileExt === 'bmp' ||
        fileExt === 'pic' ||
        fileExt === 'gif' ||
        fileExt === 'tif' ||
        fileExt === 'tiff'" :src="blobURL">
    <video v-if="
        fileExt === 'mp4' ||
        fileExt === 'webm'" :src="blobURL" controls autoplay></video>
    <audio v-if="
        fileExt === 'mp3' ||
        fileExt === 'wav' ||
        fileExt === 'ogg'" :src="blobURL" controls autoplay></audio>
    <VueOfficeDocx v-if="
        fileExt === 'doc' ||
        fileExt === 'docx'" :src="blobURL" class="!h-screen"/>
    <VueOfficeExcel v-if="
        fileExt === 'xls' ||
        fileExt === 'xlsx'" :src="blobURL" class="!h-screen"/>
    <VueOfficePdf v-if="fileExt === 'pdf'" :src="blobURL" class="!h-screen"/>
</template>

<script lang="ts">
import VueOfficeDocx from "@vue-office/docx";
import VueOfficeExcel from "@vue-office/excel";
import VueOfficePdf from "@vue-office/pdf";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

var md = new MarkdownIt({
    html: true,
    highlight: (code: string, language: string) => {
        if(language && hljs.getLanguage(language)) {
            try {
                return hljs.highlight(code, { language }).value;
            } catch (err) {
                // do nothing
            }
        }

        return "";
    }
});

export default {
    components: {
        VueOfficeDocx,
        VueOfficeExcel,
        VueOfficePdf
    }
}
</script>

<style>
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    padding: 25px;
}

.markdown-body img {
    display: inline !important;
}

.markdown-body ul {
    list-style-type: disc !important;
}

.markdown-body ol {
    list-style-type: decimal !important;
}

.markdown-body code * {
    font-family: Consolas, monospace;
}

@media (max-width: 767px) {
	.markdown-body {
		padding: 15px;
	}
}
</style>
