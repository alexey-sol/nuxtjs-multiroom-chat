<template>
    <nuxt />
</template>

<style lang="scss">
@import "@/assets/styles/style.scss";

html {
    font-family: $font-family--primary;
    font-size: 10px;
    color: $text-color--primary;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}

body {
    position: relative;
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    justify-content: center;
    background-color: $bg-color--base;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
