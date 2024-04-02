<script lang="ts" setup>
    defineProps(["linnear"])
    import router from '@/router'
    import {reactive} from 'vue'
    let user=reactive({Email:'',Password:''})
    function login(){
        console.log(user)
        
            router.push({path:'/home'})
    }
</script>

<template>
    <div id="log">
        <div class="left">
            <h2>欢迎登录</h2>
            <input v-model="user.Email" placeholder="Email">
            <input v-model="user.Password" placeholder="Password">
            <span id="forget">忘记密码？</span>
            <button @click="login">点击登录</button>
        </div>
        <div class="right">
            <RouterLink to="/signin">没有账号，点击注册</RouterLink>
        </div>
    </div>
</template>

<style scoped>
    #log{
        margin: auto;
        display: flex;
        border-radius: 5px;
        justify-content: space-around;
        flex-direction: row;
        width: 40%;
        height: 50%;
        font-family: "Microsoft soft";
    }
    .left{
        flex:1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        background-color:#f0f0f0  ;
    }
    .right{
        flex:1;
        display: flex;
        justify-content: center;
    }
    input{
        width: 70%;
        margin: auto;
        outline-style: none ;
        border: 1px solid #ccc; 
        border-radius: 8px;
        padding: 3%;
        font-size: 14px;
        font-weight: 700;
    }
    .right a,
    .left button{
        width: 50%;
        margin: auto;
        position: relative;
        border-radius: 30px;
        outline-style: none ;
        border: 1px solid #ccc; 
        background-image:linear-gradient(90deg,v-bind(linnear));
        background-size: 400%;
        padding: 3%;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        transform-style: preserve-3d;
    }
    button{
        color: white;
    }
    .right a:hover,
    button:hover{
        animation: animate 8s linear infinite;
    }
    .right a::before,
    button::before{
        content: '';
        position:absolute;
        width: 100%;
        height: 100%;
        inset: -5px;
        z-index: -1;
        background-image:linear-gradient(90deg,v-bind(linnear));
        background-size: 400%;
        border-radius: 40px;
        opacity: 0;
    }
    .right a:hover::before,
    button:hover::before{
        filter: blur(20px);
        opacity: 1;
        animation: animate 8s linear infinite;
        transform: translateZ(-1px);
    }
    @keyframes animate{
        from {
            background-position: 0%;
        }
        to{
            background-position: 400%;
        }
    } 
    #forget{
        cursor: pointer;
        font-size: 14px;
    }
    .right a{
    width: 70%;
    text-decoration: none;
    color: white;
    font-weight: bold;
    }
</style>
