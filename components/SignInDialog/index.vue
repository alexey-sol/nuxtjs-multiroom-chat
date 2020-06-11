<template>
    <Dialog
        title="Please sign in first"
        width="350px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
        :visible.sync="visible"
    >
        <Form class="form">
            <FormItem class="form-item">
                <label>
                    <span>
                        Your name:
                    </span>

                    <Input
                        v-model="userName"
                        autofocus
                        maxlength="30"
                        placeholder="Name"
                        @keypress.enter.exact.native.prevent="handleSubmit(userName)"
                    />
                </label>
            </FormItem>

            <section
                class="buttons-container"
            >
                <Button
                    class="button"
                    @click="handleCancel"
                >
                    Go back
                </Button>

                <Button
                    class="button"
                    type="primary"
                    @click="handleSubmit(userName)"
                >
                    Let me in
                </Button>
            </section>
        </Form>
    </Dialog>
</template>

<script src="./SignInDialog.js"></script>

<style
    lang="scss"
    scoped
    src="./SignInDialog.scss"
></style>
