/**
 * https://www.i18next.com/translation-function/formatting#adding-custom-format-function
 * https://github.com/isaachinman/next-i18next#unserialisable-configs
 * We may want to use our custom formatter hence we need to follow this guide
 */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    reloadOnPrerender: true
  },
};
