<template>
    <Container
        :class="['wrapper', (showSignIn) ? 'collapsed' : '']"
    >
        <header class="header">
            <div class="chat-name">
                <span class="prefix">
                    Chat name:
                </span>

                <span>
                    {{ currentRoom.name }}
                </span>
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
            <Users :current-user="currentUser" />
            <Messages :current-user="currentUser" />
            <MessageInput :current-user="currentUser" />
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
