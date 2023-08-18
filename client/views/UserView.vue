<script setup lang="ts">
import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
import md5 from "md5-node";

import { apiURL } from "../global";
import Utils from "../utils";

var newNameInput = ref<any>(null);
var newPasswordInput = ref<any>(null);
var repeatPasswordInput = ref<any>(null);

const token = Utils.getCookie("token");

interface SubmitNewNameResponseData {
    error: object | null
    pass: boolean
    newToken: string
}

interface SubmitNewPasswordResponseData {
    error: object | null
    pass: boolean
    newToken: string
}

function handleSumbitNewName(): void {
    const newName = newNameInput.value.input.value;
    if(newName === "") return;

    var password = prompt("请输入密码以继续");
    if(!password || password === "") return;
    password = md5(password);

    axios.post<any, AxiosResponse<SubmitNewNameResponseData>>(apiURL +"/setUserName?token="+ token, {
        newName,
        password
    }).then((res) => {
        if(!res.data.pass) {
            alert("密码错误");
            return;
        }

        const newToken = res.data.newToken;

        Utils.setCookie("token", encodeURIComponent(newToken));
        window.location.reload();
    }).catch((err) => {
        alert(err);
    });
}

function handleSubmitNewPassword(): void {
    const newPassword = newPasswordInput.value.input.value;
    const repeatPassword = repeatPasswordInput.value.input.value;
    if(newPassword === "" || repeatPassword === "") return;

    if(newPassword !== repeatPassword) {
        alert("两次输入的密码不一致");
        return;
    }

    var password = prompt("请输入密码以继续");
    if(!password || password === "") return;
    password = md5(password);

    axios.post<any, AxiosResponse<SubmitNewPasswordResponseData>>(apiURL +"/setUserPassword?token="+ token, {
        newPassword: md5(newPassword),
        password
    }).then((res) => {
        if(!res.data.pass) {
            alert("密码错误");
            return;
        }
        
        const newToken = res.data.newToken;

        Utils.setCookie("token", encodeURIComponent(newToken));
        window.location.reload();
    }).catch((err) => {
        alert(err);
    });
}

function handleLogout(): void {
    Utils.deleteCookie("token");
    window.location.reload();
}
</script>

<template>
    <Page title="用户中心">
        <Section title="修改用户名">
            <InputBox label="新名称" class="w-64 mr-3 inline-block" ref="newNameInput"/>
            <Button text="确认" type="success" @click="handleSumbitNewName()"/>
        </Section>

        <Section title="修改密码">
            <InputBox label="新密码" safe class="w-64 mr-3" ref="newPasswordInput"/>
            <InputBox label="重复新密码" safe class="w-64 mr-3 inline-block" ref="repeatPasswordInput"/>
            <Button text="确认" type="success" @click="handleSubmitNewPassword()"/>
        </Section>

        <Section title="危险操作" class="space-x-3">
            <Button text="登出" type="primary" @click="handleLogout()"/>
            <Button text="注销" type="danger"/>
        </Section>
    </Page>
</template>

<script lang="ts">
import Page from "../components/Page.vue";
import Section from "../components/Section.vue";
import InputBox from "../components/InputBox.vue";
import Button from "../components/Button.vue";

export default {
    components: {
        Page,
        Section,
        InputBox,
        Button
    }
}
</script>
