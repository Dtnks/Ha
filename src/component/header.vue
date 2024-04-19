<template>
    <div id="header">
            <h2 style="padding-top: 15px;">
                <slot name="pagename"></slot>
            </h2>
            <div id="person">
                <img src="">
                <div>
                    <p><slot name="name"></slot></p>
                    <p><slot name="rate"></slot></p>
                </div>
            </div>
        </div>
        <hr>
</template>
<style>
    #header{
    display: flex;
    flex-direction: row;
    padding: 15px 15px 5px 15px;
    justify-content: space-between;
    }
</style>