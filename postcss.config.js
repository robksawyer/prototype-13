module.exports = {
  plugins: [
    'postcss-import',
    'postcss-css-variables',
    'postcss-nested',
    'postcss-selector-not',
    'postcss-flexbugs-fixes',
    'postcss-easing-gradients',
    'tailwindcss',
    [
      'postcss-preset-env',
      {
        stage: 1,
        features: {
          'nesting-rules': true,
        },
        // autoprefixer: {
        //   grid: true
        // }
      },
    ],
    'autoprefixer',
  ],
}
