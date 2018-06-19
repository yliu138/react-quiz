const autoprefixer = require('autoprefixer');
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
         },
         {
           loader: require.resolve('postcss-loader'),
           options: {
             ident: 'postcss',
             plugins: () => [
               require('postcss-flexbugs-fixes'),
               autoprefixer({
                 browsers: [
                   '>1%',
                   'last 4 versions',
                   'Firefox ESR',
                   'not ie < 9',
                 ],
                 flexbox: 'no-2009',
               }),
             ],
           },
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
