<script lang="ts" setup>
defineProps(["linnear"])

</script>
<template>
    <slot name="title"></slot>
    <slot name="number"></slot>
    <p>{{ $attrs }}</p>
</template>
<style scoped>
template{
    background-color:v-bind(linnear);
}
</style>