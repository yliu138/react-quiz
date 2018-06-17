const paths = require('./paths');

const loaders = {
    sass: {
        test: /\.scss|\.sass$/,
        include: paths.appSrc,
        use: [
         require.resolve('style-loader'),
         {
           loader: require.resolve('css-loader'),
           options: {
             importLoaders: 1,
           },
         },
         {
           loader: require.resolve('sass-loader')
         }
       ]
    },
    exclude: [
      /\.(js|jsx|mjs)$/,
      /\.html$/,
      /\.json$/,
      /\.scss$/,
      /\.sass$/
    ],
}

// loaders: ['style', 'css', 'sass']

module.exports = {
    loaders: loaders,
};
