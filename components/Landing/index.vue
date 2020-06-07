<template>
    <Container class="container">
        <Header class="header">
            Nuxt.js Multiroom Chat
        </Header>

        <Main class="main">
            <Form @submit.prevent="joinChat">
                <FormItem class="form-item">
                    <label>
                        <span>
                            Your name:
                        </span>

                        <Input
                            v-model="userName"
                            maxlength="40"
                            placeholder="Name"
                            @keypress.enter.exact.native="joinChat()"
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
                            maxlength="40"
                            placeholder="Chat name"
                            @keypress.enter.exact.native="createChat()"
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
                            placeholder="Choose a chat"
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
                        @click="joinChat"
                    >
                        Join
                    </Button>
                </FormItem>
            </Form>
        </Main>
    </Container>
</template>

<script src="./Landing.js"></script>

<style
    lang="scss"
    scoped
    src="./Landing.scss"
></style>
