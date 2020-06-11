<template>
    <section class="users-container">
        <header class="users-header">
            Users in the chat:
        </header>

        <ul class="users-list">
            <li
                v-for="user in users"
                :key="user.id"
                class="user-item"
            >
                {{ user.name }}

                <span
                    v-if="currentUser.id === user.id"
                    class="postfix"
                >
                    (you)
                </span>
            </li>
        </ul>
    </section>
</template>

<script src="./Users.js"></script>

<style
    lang="scss"
    scoped
    src="./Users.scss"
></style>
