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
var passwordRepeatInput = ref<any>(null);

interface ResponseData {
    error: {
        sqlMessage: string
    } | null
}

function handleSubmit(): void {
    const name = usernameInput.value.input.value;
    const password = passwordInput.value.input.value;
    const passwordRepeat = passwordRepeatInput.value.input.value;

    if(password !== passwordRepeat) {
        alert("两次输入的密码不一致");
        return;
    }

    if(password.length < 6) {
        alert("密码长度应不小于6");
        return;
    }

    if(name === "" || password === "" || passwordRepeat === "") {
        return;
    }

    axios.post<any, AxiosResponse<ResponseData>>(apiURL +"/registerUser", {
        name,
        password: md5(password)
    }).then((res) => {
        console.log(res.data);
        if(res.data.error) {
            alert("注册失败，ERROR: "+ res.data.error.sqlMessage);
            return;
        }

        alert("注册成功");
        window.location.href = "/login";
    }).catch((err) => {
        alert("注册失败，ERROR: "+ err);
    });
}

function handleLogin(): void {
    window.location.href = "/login";
}
</script>

<template>
    <div class="flex items-center w-full h-full">
        <Card class="w-[390px] h-[450px] flex flex-col mx-auto p-5">
            <header class="h-[5.625rem] flex items-center">
                <span class="text-3xl font-semibold text-slate-700 mx-auto">注册新账号</span>
            </header>
            <div class="flex-1 flex flex-col">
                <InputBox label="用户名" ref="usernameInput"/>
                <InputBox label="密码" safe ref="passwordInput"/>
                <InputBox label="重复密码" safe ref="passwordRepeatInput"/>
            </div>
            <div class="h-[6.225rem] flex flex-col justify-end">
                <div class="flex space-x-4">
                    <Button class="flex-1 w-full" text="已有账号? 登录" type="primary" @click="handleLogin()"/>
                    <Button class="flex-1 w-full" text="提交" type="success" @click="handleSubmit()"/>
                </div>
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
