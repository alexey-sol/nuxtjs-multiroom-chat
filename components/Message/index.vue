<template>
    <li :class="['message', (isSystemMessage) ? 'system' : '']">
        <div :class="['author-name', (isAuthor) ? 'is-author' : '']">
            {{ message.authorName }}
        </div>

        <div class="created-at">
            {{ formatDate(message.createdAt) }}
        </div>

        <div class="text">
            {{ message.text }}
        </div>
    </li>
</template>

<script src="./Message.js"></script>

<style
    lang="scss"
    scoped
    src="./Message.scss"
></style>
