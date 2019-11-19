module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-initial')({
            reset: "inherited",
        }),
    ]
}
