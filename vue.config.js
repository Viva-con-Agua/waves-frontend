module.exports = {
    chainWebpack: config => {
        config.module
            .rule("vue")
    },
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/waves/'
        : '/waves/'
}
