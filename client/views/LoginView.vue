<script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
import md5 from "md5-node";

import { apiURL } from "../global";
import Utils from "../utils";

const token = Utils.getCookie("token");
if(token !== "") {
    window.location.href = "/app";
}

var usernameInput = ref<any>(null);
var passwordInput = ref<any>(null);

interface ResponseData {
    error: object | null
    token: string
    hasUser: boolean
    pass: boolean
}

function handleLogin(): void {
    const name = usernameInput.value.input.value;
    const password = passwordInput.value.input.value;

    if(name === "" || password === "") {
        return;
    }

    axios.post<any, AxiosResponse<ResponseData>>(apiURL +"/login", {
        name,
        password: md5(password)
    }).then((res) => {
        if(!res.data.hasUser) {
            alert("找不到此用户，请前往注册");
            return;
        }

        if(!res.data.pass) {
            alert("用户名或密码错误");
            return;
        }

        const token = res.data.token;
        Utils.setCookie("token", encodeURIComponent(token));

        window.location.href = "/app";
    }).catch((err) => {
        alert("登录失败，ERROR: "+ err);
    });
}

function handleRegister(): void {
    window.location.href = "/register";
}

document.body.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        handleLogin();
    }
});
</script>

<template>
    <div class="flex items-center w-full h-full">
        <Card class="w-[390px] h-[450px] flex flex-col mx-auto p-5">
            <header class="h-[5.625rem] flex items-center">
                <span class="text-3xl font-semibold text-slate-700 mx-auto">Pancake Cloud</span>
            </header>
            <div class="flex-1 flex flex-col">
                <InputBox label="用户名" ref="usernameInput"/>
                <InputBox label="密码" safe ref="passwordInput"/>
            </div>
            <div class="h-[6.225rem] flex flex-col justify-end space-y-4">
                <Button class="w-full" text="登录" type="success" @click="handleLogin()"/>
                <Button class="w-full" text="注册" type="primary" @click="handleRegister()"/>
            </div>
        </Card>
    </div>
</template>

<script lang="ts">
import Card from "../components/Card.vue";
import InputBox from "../components/InputBox.vue";
import Button from "../components/Button.vue";

export default {
    components: {
        Card,
        InputBox,
        Button
    }
}
</script>
