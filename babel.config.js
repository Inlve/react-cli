module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
        ["react-css-modules", {
            "generateScopedName": "[path][name]__[local]--[hash:base64:5]",
            "filetypes": {
                ".scss": {
                    "syntax": "postcss-scss"
                }
            }
        }],
        "react-hot-loader/babel"
    ],
}
