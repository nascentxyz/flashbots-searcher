module.exports = {
  plugins: [
    "postcss-color-mod-function",
    "postcss-flexbugs-fixes",
    "postcss-mixins",
    "postcss-nested",
    // can bump postcss-preset-env when postcss 8 is supported
    // see: https://github.com/csstools/postcss-preset-env/issues/191
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 1,
        preserve: true,
        features: {
          "custom-properties": true,
        },
      },
    ],
  ],
};
