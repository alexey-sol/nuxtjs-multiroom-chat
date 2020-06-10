<template>
    <Container
        :class="['wrapper', (showSignIn) ? 'collapsed' : '']"
    >
        <header class="header">
            <div class="chat-name">
                Chat name: {{ currentRoom.name }}
            </div>

            <Button
                class="button-leave"
                plain
                type="primary"
                @click="emitLeave"
            >
                Leave chat
            </Button>
        </header>

        <main class="main">
            <section class="users">
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
                    </li>
                </ul>
            </section>

            <section
                ref="chat-window"
                class="chat"
            >
                <ul class="messages-list">
                    <Message
                        v-for="message in messages"
                        :key="message.id"
                        :author-name="message.authorName"
                        :created-at="new Date(message.createdAt)"
                        :text="message.text"
                    />
                </ul>
            </section>

            <section class="message-input">
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
        </main>

        <SignInDialog
            :handle-cancel="redirectToLanding"
            :handle-submit="signIn"
            :visible="showSignIn"
        />
    </Container>
</template>

<script src="./Room.js"></script>

<style
    lang="scss"
    scoped
    src="./Room.scss"
></style>
