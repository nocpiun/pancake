<template>
    <div class="flex items-center w-full h-full">
        <Card class="w-[390px] h-[450px] flex flex-col mx-auto p-5">
            <header class="h-[5.625rem] flex items-center">
                <span class="text-3xl font-semibold text-slate-700 mx-auto">登录账号</span>
            </header>
            <div class="flex-1 flex flex-col">
                <InputBox label="用户名"/>
                <InputBox label="密码" safe/>
            </div>
            <div class="h-[6.225rem] flex flex-col space-y-4">
                <Button text="登录" type="success" @click="handleLogin()"/>
                <Button text="注册" type="primary" @click="handleRegister()"/>
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
    },
    data() {
        return {
            handleLogin() {
                window.location.href = "/home";
            },
            handleRegister() {
                window.location.href = "/home";
            }
        }
    }
}
</script>

<style scoped>

</style>
