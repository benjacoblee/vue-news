const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: (config) => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap((options) => {
                return {
                    ...options,
                    reactivityTransform: true
                };
            });
    },
    devServer: {
        proxy: {
            "^/api": {
                target: "http://localhost:3000/api",
                ws: true,
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/api": "/" }
            }
        }
    }
});
