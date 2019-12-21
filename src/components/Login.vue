<template>
    <div id="login-box">
        <div id="login-box-title">Please, login:</div>
        <div class="login-box-lbl">Enter email:</div>
        <div><input name="email" type="text" v-model="email"></div>
        <div class="login-box-lbl">Enter password:</div>
        <div><input name="password" type="password" v-model="password"></div>
        <div :key="wideBtn.name" v-for="wideBtn in wideBtns">
            <WideBtn :wideBtn="wideBtn" :parent="'login'" v-on:wideBtnClick="handleWideBtnClick"/>
        </div>
        <a style="display:none" ref="mailto" href="mailto:dddevqa@gmail.com?subject=NewAccountRequest">Request an account</a>
    </div>
</template>

<script>
import WideBtn from './buttons/WideBtn'
import {
    toggleWideBtnDisabled
} from '../display'

export default {
    name: 'Login',
    components: {
        WideBtn
    },
    data() {
        return {
            email: '',
            password: '',
            wideBtns: [
                {name: 'login', lbl: 'Login'},
                {name: 'requestAnAccount', lbl: 'Request an account'}
            ]
        }
    },
    methods: {
        login: function() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(user => {
                    console.log(`logged in as ${user.user.email}`);
                    this.$emit('succesfulLogin', user)
                }, err => {
                    alert(err.message);
                }
            );
        },
        handleWideBtnClick: function (wideBtn) {
            switch (wideBtn) {
                case 'login':
                    this.login();
                    break
                case 'requestAnAccount':
                    this.$refs.mailto.click();
                    break
                default:
                    console.log('No action defined for this button');
            }
        }
    }
}
</script>

<style scoped>
    #login-box {
        width: 400px;
        height: 380px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #312D3C;
        position:absolute;
        z-index: 9;
        margin: auto;
        left: 50vw;
        top: 50vh;
        transform:translate(-200px, -190px);
        overflow:hidden;
        box-shadow: 0px 0px 50px 0px #000;
        display:flex;
        flex-direction: column;
    }
    #login-box>div {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    #login-box-title {
        font-family: 'Prompt', sans-serif;
        font-size: 20px;
        color: #f7f7f7;
        line-height: 40px;
        text-indent: 0px;
        border-bottom: 1px solid #f7f7f7;
    }
    .login-box-lbl {
        font-family: 'Prompt', sans-serif;
        font-size: 16px;
        color: #f7f7f7;
        line-height: 16px;
        text-indent: 0px;
        margin-bottom: 0px !important;
    }
    input[type=password] {
        width: 100%;
        padding: 7px 10px;
        margin: 0px 0;
        box-sizing: border-box;
        background-color:#5d5974;
        font-family: 'Prompt', sans-serif;
        font-size: 16px;
        color: #f7f7f7;
        line-height: 16px;
        text-indent: 0px;
        border:none;
        box-shadow: 0 0 10px 0 #000;
    }
</style>