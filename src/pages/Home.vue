<script lang="ts" setup>
defineOptions({
    inheritAttrs:false
})
</script>

<template>
    <div class="nav">
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
</template>
<style scoped>
template{
    display: flex;
    flex-direction: row;
}
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
.nav a.active{
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
}
.show{
    flex:8;
}
</style>