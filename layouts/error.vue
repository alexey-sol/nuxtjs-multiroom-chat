<template>
    <section class="page">
        <section class="container">
            <div
                v-if="error.statusCode === 404"
                class="not-found"
            >
                404
            </div>

            <div
                v-else
                class="error"
            >
                Something went wrong.
            </div>

            <nuxt-link to="/">
                <ElLink type="primary">
                    Go back?
                </ElLink>
            </nuxt-link>
        </section>
    </section>
</template>

<script>
import { Link as ElLink } from "element-ui";

export default {
    components: {
        ElLink
    },

    props: {
        error: {
            default: () => ({}),
            type: Object
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/style.scss";

.page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: 20vh;
    font-size: $font-size--medium;

    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .not-found {
            font-size: 8rem;
        }

        .error {
            font-size: 4rem;
        }

        a {
            text-decoration: none;
        }
    }
}
</style>
