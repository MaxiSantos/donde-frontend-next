// https://github.com/isaachinman/next-i18next/issues/462#issuecomment-716206904
/**
 * * loading of props.json was failing due to serverSideTranslations on dynamicPath. Therefore I needed to set this fck thing 
 * * localePath: path.resolve('./public/locales')
 */
const path = require('path')
/**
 * https://www.i18next.com/translation-function/formatting#adding-custom-format-function
 * https://github.com/isaachinman/next-i18next#unserialisable-configs
 * We may want to use our custom formatter hence we need to follow this guide
 */
module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
  },
  reloadOnPrerender: process.env.NEXT_PUBLIC_APP_STAGE === "DEVELOPMENT",
  localePath: path.resolve('./public/locales')    
};
