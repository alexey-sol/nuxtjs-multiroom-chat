<template>
    <Container class="wrapper">
        <header class="header">
            Nuxt.js Multiroom Chat
        </header>

        <main class="main">
            <Form @submit.prevent="signIn">
                <FormItem class="form-item">
                    <label>
                        <span>
                            Your name:
                        </span>

                        <Input
                            v-model="userName"
                            maxlength="30"
                            placeholder="Name"
                            @keypress.enter.exact.native="signIn"
                        />
                    </label>
                </FormItem>

                <FormItem class="form-item">
                    <label>
                        <span>
                            Maybe you would like to spin up a new chat?
                        </span>

                        <Input
                            v-model="chatName"
                            maxlength="30"
                            placeholder="Chat name"
                            @keypress.enter.exact.native="createChat"
                        />
                    </label>

                    <Button
                        class="button"
                        @click="createChat"
                    >
                        Create!
                    </Button>
                </FormItem>

                <FormItem class="form-item">
                    <label>
                        <span>
                            Chat:
                        </span>

                        <Select
                            v-model="selectedRoomId"
                            :disabled="roomOptions.length === 0"
                            :placeholder="(roomOptions.length === 0)
                                ? 'There\'s no rooms yet'
                                : 'Choose a room'"
                        >
                            <Option
                                v-for="option in roomOptions"
                                :key="option.value"
                                :label="option.label"
                                :value="option.value"
                            />
                        </Select>
                    </label>

                    <Button
                        class="button"
                        type="primary"
                        @click="signIn"
                    >
                        Join
                    </Button>
                </FormItem>
            </Form>
        </main>
    </Container>
</template>

<script src="./Landing.js"></script>

<style
    lang="scss"
    scoped
    src="./Landing.scss"
></style>
