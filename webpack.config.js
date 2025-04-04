const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './client/3-JS_Directory/Main_script.js', // Entry point
    output: {
        filename: 'bundle.js', // Output bundle
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    
    module: {
        rules: [
            {
                test: /\.css$/,  // Regex for matching .css files
                use: ['style-loader', 'css-loader'], // The order matters: first load CSS, then inject it
            },
            {
                test: /\.scss$/, // For SCSS/SASS support
                use: [
                    'style-loader', 
                    'css-loader',
                    'sass-loader', // Converts SCSS to CSS
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: '1-Html_Directory/IndexToCompile.html',  // Your source HTML
            filename: 'index.html',  // Output file
            inject: 'body',  // Inject scripts before `</body>`
        }),
    ],

    mode: 'production', // or 'development'
};