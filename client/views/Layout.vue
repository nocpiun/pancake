<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
    <div>
        <nav class="w-full px-60 py-3 backdrop-blur-xl text-slate-950 shadow-lg flex justify-between sticky top-0 z-50">
            <div class="flex space-x-7">

                <h1 class="font-semibold text-lg hover:cursor-default">Pancake</h1>

                <ul class="list-none flex space-x-7">
                    <li>
                        <NavButton text="主页" link="/app/home"/>
                    </li>
                    <li>
                        <NavButton text="共享" link="/app/share"/>
                    </li>
                </ul>
            </div>

            <ul class="list-none flex space-x-7">
                <li>
                    <NavButton :text="userInfo.name" link="/app/user" tooltip="用户中心"/>
                </li>
            </ul>
        </nav>

        <RouterView />
    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from "axios";

import NavButton from "../components/NavButton.vue";

import Utils from "../utils";
import { apiURL } from '../global';
import { UserInfoResponseData } from "../types";

const token = Utils.getCookie("token");
if(token === "") { // Hasn't logged in yet
    window.location.href = "/login";
}

export default {
    components: {
        NavButton
    },
    data() {
        return {
            userInfo: {
                name: ""
            }
        }
    },
    created() {
        axios.get<any, AxiosResponse<UserInfoResponseData>>(apiURL +"/getUserInfo?token="+ token).then((res) => {
            this.userInfo = res.data.userInfo;
        }).catch((err) => {
            alert(err);
        });
    }
}
</script>
