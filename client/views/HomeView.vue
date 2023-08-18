<script setup lang="ts">
import { DirectoryItemType } from "../types";

function handleWheel(e: WheelEvent) {
    var recommendedList = document.getElementById("recommended-list");
    if(!recommendedList) return;
    
    e.deltaY > 0
    ? recommendedList.scrollLeft += 100
    : recommendedList.scrollLeft -= 100;

    e.preventDefault();
}
</script>

<template>
    <Page title="主页">
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
                    <Button text="新建文件夹" type="success"/>
                    <Button text="新建文件" type="success"/>
                </div>
                <div class="space-x-3">
                    <Button text="下载" type="primary"/>
                    <Button text="共享" type="primary"/>
                </div>
            </div>

            <div class="w-full h-[550px] overflow-y-auto border rounded border-gray-300 flex flex-col overflow-x-hidden">
                <DirectoryItem name="My Driver" :type="DirectoryItemType.FOLDER"/>
            </div>
        </Section>
    </Page>
</template>

<script lang="ts">
import Page from "../components/Page.vue";
import Section from "../components/Section.vue";
import Button from "../components/Button.vue";
import RecommendedItem from "../components/RecommendedItem.vue";
import DirectoryItem from "../components/DirectoryItem.vue";

export default {
    components: {
        Page,
        Section,
        Button,
        RecommendedItem,
        DirectoryItem
    }
}
</script>
