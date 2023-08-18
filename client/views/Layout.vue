<script setup lang="ts">
import { RouterView } from "vue-router";

import Utils from "../utils";

const token = Utils.getCookie("token");
if(token === "") { // Hasn't logged in yet
    window.location.href = "/login";
}
</script>

<template>
    <div>
        <nav class="w-full px-60 py-3 bg-cyan-950 text-white shadow-lg flex justify-between sticky top-0">
            <div class="flex space-x-7">

                <h1 class="font-semibold text-lg hover:cursor-default">Pancake</h1>

                <ul class="list-none flex space-x-7">
                    <li>
                        <NavButton text="主页" link="/app/home"/>
                    </li>
                    <li>
                        <NavButton text="共享" link="/app/share"/>
                    </li>
                    <li>
                        <NavButton text="存储空间" link="/app/drive"/>
                    </li>
                </ul>
            </div>

            <ul class="list-none flex space-x-7">
                <li>
                    <NavButton text="设置" link="/app/settings"/>
                </li>
                <li>
                    <NavButton text="用户" link="/app/user"/>
                </li>
            </ul>
        </nav>

        <RouterView />
    </div>
</template>

<script lang="ts">
import NavButton from "../components/NavButton.vue";

export default {
    components: {
        NavButton
    }
}
</script>
