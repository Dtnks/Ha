<script lang="ts" setup>

</script>
<template>
    <div class="all">
        <el-icon size="40px"><User /></el-icon>
        <div class="center">
            <span>
                <slot name="name"></slot>
            </span>
            <span>
                <slot name="position"></slot>
            </span>
        </div>
        <el-icon ><More /></el-icon>
    </div>
</template>
<style scoped>
.all{
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
}
svg{
    flex: 1;
}
.center{
    flex: 3;
    display: flex;
    flex-direction: column;
}
</style>