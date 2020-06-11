module.exports = {
    mode: "universal",

    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: process.env.npm_package_description || "" }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
        ]
    },

    loading: { color: "#fff" },

    plugins: [
        { src: "@/plugins/socket.client.js", ssr: false },
        { src: "@/plugins/element-ui.js" },
        { src: "@/plugins/utils/validators" }
    ],

    buildModules: [
        "@nuxtjs/eslint-module"
    ],

    modules: [
        "@nuxtjs/dotenv"
    ],

    build: {
        extend (config, ctx) {}
    }
};
