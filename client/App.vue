<script setup lang="ts">
import { RouterView } from "vue-router";

import Utils from "./utils";

const token = Utils.getCookie("token");
if(token !== "" && window.location.pathname === "/") {
    window.location.href = "/app";
}
</script>

<template>
	<main class="w-screen h-screen">
		<RouterView />
	</main>
</template>

<style>
:root {
    --pc-scrollbar-size: 10px;
}

main {
	overflow-x: hidden;
}

/* Font */

@font-face {
    font-family: NotoSans-SC-Light;
    src: url("./assets/NotoSansSC-Light.otf");
}

main * {
    font-family: NotoSans-SC-Light, Roboto, Segoe UI, sans-serif;
}

/* Scrollbar */

::-webkit-scrollbar {
    width: var(--pc-scrollbar-size);
    height: var(--pc-scrollbar-size);
}

::-webkit-scrollbar-track {
    width: var(--pc-scrollbar-size);
    height: var(--pc-scrollbar-size);
    background: #e0e0e0;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(107, 107, 107, 0.39);
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgba(107, 107, 107, 0.671);
}

::-webkit-scrollbar-thumb:active {
    background-color: rgb(107, 107, 107);
}
</style>
