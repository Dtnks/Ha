<template>
    <div id="header">
            <h2 style="padding-top: 15px;cursor: default;">
                <slot name="pagename"></slot>
            </h2>
            <div id="person">
                <img src="">
                <div>
                    <p><slot name="name" style="cursor: default;"></slot></p>
                    <p><slot name="rate" style="cursor: default;"></slot></p>
                </div>
            </div>
        </div>
        <hr>
</template>
<style>
    #header{
    display: flex;
    flex-direction: row;
    padding-left: 1vw;
    justify-content: space-between;
    }
</style>