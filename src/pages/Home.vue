<script lang="ts" setup>
defineOptions({
    inheritAttrs:false
})
</script>

<template>
    <div style="height: 100%;width: 100%;display: flex;flex-direction: row;">
        <div class="nav">
            <div id="logo">
                <p>“哈大饼”</p>
                <p>管理平台</p>
            </div>
            <RouterLink :to="{name:'a'}" active-class="active">首页</RouterLink>
            <RouterLink :to="{name:'b'}" active-class="active">物料管理</RouterLink>
            <RouterLink :to="{name:'c'}" active-class="active">商品管理</RouterLink>
            <RouterLink :to="{name:'d'}" active-class="active">订单管理</RouterLink>
            <RouterLink :to="{name:'e'}" active-class="active">员工管理</RouterLink>
            <RouterLink :to="{name:'f'}" active-class="active">财务管理</RouterLink>
        </div>
        <div class="show">
            <RouterView v-bind="$attrs"></RouterView>
        </div>
    </div>
</template>
<style scoped>
.nav{
    flex:1;
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255, 0.25);
}
.nav a{
    background-color: rgba(255, 255, 255, 0.5);
    padding: 15px;
    color:black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    text-decoration: none;
}
@keyframes order {
    0%{
        scale: 1;
        background-color: rgba(255, 255, 255, 0.5);
        color:black;
    }
    50%{
        scale: 1.1;
    }
    100%{
        scale:1;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
    }
}
.nav a.active{
    animation: order 0.5s ease-in-out ;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
}
.show{
    flex:8;
}
#logo{
    background-color: rgba(0,0,0, 0.3);
    font-family: "Cairo";
	text-align: center;
	color: #FFF;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    cursor: pointer;
    font-style: italic;
}
#logo p{
    background-image: url(https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif);
	background-size: 200%;
	color: transparent;
	-moz-background-clip: text;
	-webkit-background-clip: text;
	text-transform: uppercase;
	font-size: 24px;
	margin: 10px 0;
}
</style>