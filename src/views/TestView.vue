<template>
    <div class="login">
        <div class="login-panel">
            <div class="login-title">用户登录</div>
            <el-form ref="formRef" :model="formData" :rules="rules" class="login-form">
                <el-form-item prop="account">
                    <el-input placeholder="请输入账号" v-model="formData.account" size="large">
                        <template #prefix>
                            <span class="iconfont icon-account"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="formData.password" type="password" autocomplete="off"
                        size="large">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkCode">
                    <div class="check-code-panel">
                        <el-input placeholder="请输入验证码" v-model="formData.checkCode" class="input-panel" size="large" />
                        <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode">
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="formData.rememberMe" :label="true">记住我</el-checkbox>
                </el-form-item>
                <el-form-item label="">
                    <div class="login-button">
                        <el-button :style="{ width: '100%' }" @click="">重置
                        </el-button>
                        <el-button type="primary" :style="{ width: '100%' }" @click="submitForm()">登录
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
            <div class="msg">
                还没有账号?<a href="#">点击注册</a>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const api = {
    checkCode: "api/checkCode",
    login: 'login',
}

// 表单相关
const formRef = ref(null)
const formData = reactive({})
const rules = reactive({
    account: [{
        required: true,
        message: '请输入',
    }],
    password: [{
        required: true,
        message: '请输入',
    }],
    checkCode: [{
        required: true,
        message: '请输入',
    }]
})
const submitForm = () => {
    formRef.value.validate(async (valid) => {
        if (!valid) return
        let result = await proxy.request({
            url: api.login,
            params: {
                account: formData.account,
                password: formData.account,
                checkCode: formData.checkCode,
            }
        })
    })
}

// 验证码相关
const checkCodeUrl = ref(api.checkCode);
const changeCheckCode = () => {
    checkCodeUrl.value = api.checkCode + "?" + new Date().getTime()
}
</script>

<style lang='scss' scoped>
.login {
    position: absolute;
    width: 100%;
    height: calc(100vh);
    background: url('../assets/img/login-bg.jpg') no-repeat;
    background-position: center center;
    background-size: cover;

    .login-panel {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0 50px;
        width: 400px;
        height: 480px;
        background: rgba($color: #fff, $alpha: 0.7);
        border-radius: 15px;

        .login-title {
            font-size: 38px;
            font-weight: bold;
            text-align: center;
            line-height: 130px;
        }

        .check-code-panel {
            display: flex;
            align-items: center;

            .input-panel {
                flex: 1;
                margin-right: 5px;
            }

            .check-code {
                cursor: pointer;
            }
        }

        .login-button {
            display: flex;
            width: 100%;
        }

        .msg {
            text-align: center;

            a {
                text-decoration: none;
                color: #abc1ee;
            }
        }
    }
}
</style>