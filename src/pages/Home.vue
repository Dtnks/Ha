<script lang="ts" setup>
</script>

<template>
    <div class="nav">
        <RouterLink :to="{name:'a'}" active-class="active">菜品</RouterLink>
        <RouterLink :to="{name:'b'}" active-class="active">b</RouterLink>
        <RouterLink :to="{name:'c'}" active-class="active">c</RouterLink>
        <RouterLink :to="{name:'d'}" active-class="active">d</RouterLink>
        <RouterLink :to="{name:'e'}" active-class="active">e</RouterLink>
        <RouterLink :to="{name:'f'}" active-class="active">f</RouterLink>
    </div>
    <div class="show">
        <RouterView></RouterView>
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
}
.nav a{
    background-color: rgba(255, 255, 255, 0.5);
    padding: 15px;
    color:black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-top-right-radius: 80px;
    border-bottom-right-radius: 50px;
    text-decoration: none;
}
.nav a.active{
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
}
.show{
    flex:7;
}
</style>