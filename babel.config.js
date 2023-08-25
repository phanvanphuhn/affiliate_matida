module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@navigation': './src/navigation',
          '@interfaces': './src/interfaces',
          '@util': './src/util',
          '@component': './src/component',
          '@stylesCommon': './src/stylesCommon',
          '@redux': './src/redux',
          '@services': './src/services',
          '@routeName': './src/navigation/routeName',
          '@images': './src/images',
          '@i18n': './src/translations/i18n',
          '@constant': './src/constant',
          '@enum': './src/enum',
          '@type': './src/type',
        },
      },
    ],
  ],
};
