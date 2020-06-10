<template>
    <li
        :class="['message', (isSystemMessage) ? 'system' : '']"
    >
        <div class="author-name">
            {{ authorName }}
        </div>

        <div class="created-at">
            {{ formatDate(createdAt) }}
        </div>

        <div class="text">
            {{ text }}
        </div>
    </li>
</template>

<script src="./Message.js"></script>

<style
    lang="scss"
    scoped
    src="./Message.scss"
></style>
