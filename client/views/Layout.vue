<script setup lang="ts">
import { RouterView } from "vue-router";

const _token = Utils.getCookie("token");
if(_token === "") { // Hasn't logged in yet
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
import { UserInfo } from "../types";

const token = Utils.getCookie("token");

interface UserInfoResponseData {
    error: object | null
    userInfo: UserInfo
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
