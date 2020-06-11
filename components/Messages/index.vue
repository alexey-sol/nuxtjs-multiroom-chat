<template>
    <section
        ref="messages"
        class="messages-container"
    >
        <ul class="messages-list">
            <Message
                v-for="message in messages"
                :key="message.id"
                :message="message"
                :is-author="currentUser.name === message.authorName"
            />
        </ul>
    </section>
</template>

<script src="./Messages.js"></script>

<style
    lang="scss"
    scoped
    src="./Messages.scss"
></style>
