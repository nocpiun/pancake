<script setup lang="ts">
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
            class="w-full h-56 pt-8 space-x-3 overflow-x-auto whitespace-nowrap"
            title="推荐项目"
            description="最近浏览次数较多"
            @mousewheel="handleWheel">
            <RecommendedItem name="TestFile"/>
            <RecommendedItem name="TestFile"/>
            <RecommendedItem name="TestFile"/>
            <RecommendedItem name="TestFile"/>
            <RecommendedItem name="TestFile"/>
        </Section>

        <Section title="文件管理">

        </Section>
    </Page>
</template>

<script lang="ts">
import Page from "../components/Page.vue";
import Section from "../components/Section.vue";
import RecommendedItem from "../components/RecommendedItem.vue";

export default {
    components: {
        Page,
        Section,
        RecommendedItem
    }
}
</script>
