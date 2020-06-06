<template>
    <Container class="container">
        <Header class="header">
            Multiroom Chat
        </Header>

        <Main class="main">
            <Form>
                <FormItem class="form-item">
                    <label>
                        <span>
                            Your name:
                        </span>

                        <Input placeholder="Name" />
                    </label>
                </FormItem>

                <FormItem class="form-item">
                    <label>
                        <span>
                            Maybe you would like to spin up a new chat?
                        </span>

                        <Input placeholder="Chat name" />
                    </label>

                    <Button class="button">
                        Create!
                    </Button>
                </FormItem>

                <FormItem class="form-item">
                    <label>
                        <span>
                            Chat:
                        </span>

                        <Select />
                    </label>

                    <Button
                        class="button"
                        type="primary"
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
