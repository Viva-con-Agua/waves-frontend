module.exports = {
    chainWebpack: config => {
        config.module
            .rule("vue")
            .options({ /* ... */ });
    },
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/waves/'
        : '/waves/'
}
