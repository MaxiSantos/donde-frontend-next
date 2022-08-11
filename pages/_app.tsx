import NProgress from 'nprogress';
import Router from 'next/router';
import dynamic from "next/dynamic";
import { ApolloProvider } from '@apollo/client';
import type { AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import * as amplitude from '@amplitude/analytics-browser';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import 'app/common/styles/nprogress.css';
import '@algolia/autocomplete-theme-classic';
import "swiper/css";
import "swiper/css/navigation";
import '../app/common/styles/icons.css';
import "./_app.css";
import "app/common/styles/theme/themes-vars.module.scss"

import { theme } from 'app/common/styles/theme';
import client from '../app/common/lib/apolloClient';
import AuthorizationProvider from '../app/common/lib/AuthorizationProvider';
import { NotificationProvider } from 'app/common/context/useNotification';
import { CustomNotification } from 'app/common/components/elements/CustomNotification';
import { AuthProvider } from '../app/common/context/useAuthContext';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import { UserActivityProvider } from 'app/common/context/useUserActivity';
import ErrorBoundary from 'app/common/components/elements/ErrorBoundary'
import { manageRefresh } from 'app/common/lib/navigation';
import { Identify } from '@amplitude/analytics-browser';

Router.events.on('routeChangeStart', (route) => {
  NProgress.start();
  const event = new Identify();
  const props = event.getUserProperties()
  console.log(props)
  manageRefresh(route)
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const onRedirectCallback = (appState) => {
  // Use Next.js's Router.replace method to replace the url
  Router.replace(appState?.returnTo || '/');
};

// https://community.amplitude.com/instrumentation-and-data-management-57/disabling-metric-tracking-during-development-182
// *not working disabling amplitude this way. I had to create a wrapper for track function
//if (process.env.NEXT_PUBLIC_IS_AMPLITUDE_ACTIVE === '1') {
amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, null, {
  //logLevel: 
  logLevel: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? 0 : 2,
  // https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/#page-view-tracking
  attribution: {
    trackPageViews: true,
  },
  // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
  onError: (error): void => {
    //Sentry.captureException(error);
    console.error(error); // eslint-disable-line no-console
  },
});
//}

const MyApp = ({ Component, pageProps }: AppProps) => {
  /*
  * UniversalApp was used with react-amplitude because of ssr of nextjs. But since we now use officila amplitude ts package we don't need it anymore.
  source: https://github.com/amplitude/Amplitude-Javascript/issues/110#issuecomment-594088315
  */
  const UniversalApp = (): JSX.Element => (
    <>
      <Head>
        <title>Donde lo busco</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <ThemeProvider theme={theme({})}>
        {<CssBaseline />}
        <ToastContainer />
        <ErrorBoundary>
          <ApolloProvider client={client}>
            <AuthProvider>
              <UserActivityProvider>
                <NotificationProvider>
                  <CustomNotification />
                  <AuthorizationProvider pageProps={pageProps}>
                    <Component {...pageProps} />
                  </AuthorizationProvider>
                </NotificationProvider>
              </UserActivityProvider>
            </AuthProvider>
          </ApolloProvider>
        </ErrorBoundary>
      </ThemeProvider>
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
