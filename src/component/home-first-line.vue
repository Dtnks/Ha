<script lang="ts" setup>
defineProps(["linnear"])
</script>
<template>
    <div class="back">
        <div>
            <slot name="title"></slot>
        </div>
        <hr>
        <div>
            <slot name="number"></slot>
        </div>
    </div>
</template>
<style scoped>
.back{
    display: flex;
    flex-direction: column;
}
div{
    margin-bottom: 20px;
}

</style>