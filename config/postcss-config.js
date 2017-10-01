const autoprefixer = require('autoprefixer');

const postCssConfig = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    sourceMap: 'inline',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('postcss-font-smoothing'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
};

module.exports = postCssConfig;