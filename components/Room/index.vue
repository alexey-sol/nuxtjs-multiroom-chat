<template>
    <Container class="container">
        <header class="header">
            <div class="chat-name">
                Chat name: {{ currentRoom.name }}
            </div>

            <Button
                class="button-leave"
                plain
                type="primary"
                @click="leaveChat"
            >
                Leave chat
            </Button>
        </header>

        <main class="main">
            <section class="users">
                <header class="users-header">
                    Active users:
                </header>

                <ul class="users-list">
                    <li
                        v-for="user in users"
                        :key="user.id"
                        class="user-item"
                    >
                        {{ user.name }}
                    </li>
                </ul>
            </section>

            <section class="chat">
                <ul class="messages-list">
                    <li
                        v-for="message in messages"
                        :key="message.id"
                        class="message-item"
                    >
                        {{ message.authorName }}
                        {{ message.text }}
                        {{ message.createdAt }}
                    </li>
                </ul>
            </section>

            <section class="message-field">
                <Input
                    v-model="message"
                    maxlength="99"
                    placeholder="Message"
                    show-word-limit
                    @keypress.enter.exact.native="sendMessage"
                />

                <Button @click="sendMessage">
                    Send
                </Button>
            </section>
        </main>
    </Container>
</template>

<script src="./Room.js"></script>

<style
    lang="scss"
    scoped
    src="./Room.scss"
></style>
