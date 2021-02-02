const { Module } = require("webpack");

module.exports = {
    plugins: [
        require("autoprefixer")("last 100 versions")
    ]
}
