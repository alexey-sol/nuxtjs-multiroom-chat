<template>
    <section class="message-input-container">
        <Input
            v-model="message"
            class="input"
            maxlength="500"
            placeholder="Message"
            @keypress.enter.exact.native="sendMessage"
        />

        <Button @click="sendMessage">
            Send
        </Button>
    </section>
</template>

<script src="./MessageInput.js"></script>

<style
    lang="scss"
    scoped
    src="./MessageInput.scss"
></style>
