<script lang="ts" setup>
    import router from '@/router';
import {reactive} from 'vue'
    import {} from 'vue-router'
    defineProps(["linnear"])
    let user=reactive({Username:'',Email:'',Password:''})
    function sign(){
        console.log(user)
        
            alert("注册成功")
            router.push({path:'/login'})

    }
</script>

<template>
    <div id="log">
        <div class="left">
            <RouterLink to="/login">已有账号，点击登录</RouterLink>
        </div>
        <div class="right">
            <h2>注册账号</h2>
            <input v-model="user.Username" placeholder="User">
            <input v-model="user.Email" placeholder="Email">
            <input v-model="user.Password" placeholder="Password">
            <button @click="sign">点击注册</button>
        </div>
    </div>
</template>

<style scoped>
    #log{
        margin: auto;
        display: flex;
        z-index: 90;
        border-radius: 5px;
        justify-content: space-around;
        flex-direction: row;
        width: 40%;
        height: 50%;
        font-family: "Microsoft soft";
    }
    .right{
        flex:1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        background-color:#f0f0f0  ;
    }
    .left{
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
    .left a,
    button{
        width: 50%;
        margin: auto;
        position:relative;
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
    .left a:hover,
    button:hover{
        animation: animate 8s linear infinite;
    }
    .left a::before,
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
    .left a:hover::before,
    button:hover::before{
        filter: blur(20px);
        opacity: 1;
        transform: translateZ(-1px);
        animation: animate 8s linear infinite;
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
    }
    .left a{
    width: 70%;
    text-decoration: none;
    color: white;
    font-weight: bold;
    }


</style>
