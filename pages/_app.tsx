import { ApolloProvider } from '@apollo/client';
import { CacheProvider } from '@emotion/react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { ReactHooksWrapper, setHook } from 'react-hooks-outside';
import { ParallaxProvider } from "react-scroll-parallax";
import { ToastContainer } from 'react-toastify';
import { Waiter } from "react-wait";

import '@algolia/autocomplete-theme-classic';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import "app/common/styles/_app.css";
import 'app/common/styles/icons.css';
import 'app/common/styles/nprogress.css';
import "app/common/styles/theme/themes-vars.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/css";
import "swiper/css/navigation";

import { CustomNotification } from 'app/common/components/elements/CustomNotification';
import ErrorBoundary from 'app/common/components/elements/ErrorBoundary';
import { Composer } from 'app/common/context/composer';
import { AuthProvider } from 'app/common/context/useAuthContext';
import { HttpClientProvider } from 'app/common/context/useHttpclient';
import { NotificationProvider } from 'app/common/context/useNotification';
import { UserActivityProvider } from 'app/common/context/useUserActivity';
import { useLogout } from 'app/common/hooks/useLogout';
import { useMainRouteChange } from 'app/common/hooks/useMainRouteChange';
import { buildClientApi } from 'app/common/lib/api/httpClient/factory';
import client from 'app/common/lib/apolloClient';
import Authorization from 'app/common/lib/Authorization';
import { EmotionHelper } from 'app/common/lib/emotion';
import { theme } from 'app/common/stylesBKP/theme';
import { AmplitudeHelper } from 'app/lib/amplitudeHelper';

// https://community.amplitude.com/instrumentation-and-data-management-57/disabling-metric-tracking-during-development-182
// *not working disabling amplitude this way. I had to create a wrapper for track function
//if (process.env.NEXT_PUBLIC_IS_AMPLITUDE_ACTIVE === '1') {
AmplitudeHelper.init();
//}

setHook("logout", useLogout)
setHook("translation", () => { return useTranslation('common') })

const clientSideEmotionCache = EmotionHelper.createEmotionCache();
const clientApi = buildClientApi();
// TODO: check if emotionCache es being received here or it has to be reeived from pageProps section
const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps) => {
  useMainRouteChange();
  console.log("rendering app page")
  /**
   * *potentially unsafe when doing server-side
   * if error stils occurs then apply remaining changes in _document.ts
   * https://dev.to/hajhosein/nextjs-mui-v5-tutorial-2k35
   * https://gist.github.com/Danetag/800e1281a8e58a05cdd5de2caeeab4d1
   * https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922
   */
  /*const myCache = createCache({ key: 'css', prepend: true });
  myCache.compat = true*/

  /*
  * UniversalApp was used with react-amplitude because of ssr of nextjs. But since we now use officila amplitude ts package we don't need it anymore.
  source: https://github.com/amplitude/Amplitude-Javascript/issues/110#issuecomment-594088315
  */
  const UniversalApp = (): JSX.Element => (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Donde lo busco</title>
          <link href="/favicon.ico" rel="icon" />
          <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
        </Head>
        <ThemeProvider theme={theme({})}>
          <CssBaseline />
          <ToastContainer />
          <ErrorBoundary>
            <Composer items={[
              [Waiter],
              [ParallaxProvider],
              [ApolloProvider, { client }],
              [AuthProvider],
              [UserActivityProvider],
              [NotificationProvider],
              [HttpClientProvider, { clientApi }],
            ]}>
              <CustomNotification />
              <Authorization pageProps={pageProps}>
                <Component {...pageProps} />
                <ReactHooksWrapper />
              </Authorization>
            </Composer>
          </ErrorBoundary>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
  return <UniversalApp />
}

MyApp.getInitialProps = async function ({ Component, ctx }: AppContext) {
  let pageProps: { [k: string]: any } = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

//export default MyApp;
export default appWithTranslation(MyApp);

/*export default dynamic(() => Promise.resolve(appWithTranslation(MyApp)), {
  ssr: false,
});*/
