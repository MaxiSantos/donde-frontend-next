import NProgress from 'nprogress';
import Router from 'next/router';
import dynamic from "next/dynamic";
import { ApolloProvider } from '@apollo/client';
import type { AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { AmplitudeClient, Identify } from 'amplitude-js';
import {
  AmplitudeProvider,
} from "@amplitude/react-amplitude";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import '../app/common/styles/nprogress.css';
import '../app/common/styles/icons.css';
import "./_app.css";
import "app/common/styles/theme/themes-vars.module.scss"

import "swiper/css";
import "swiper/css/navigation"

import client from '../app/common/lib/apolloClient';
import AuthorizationProvider from '../app/common/lib/AuthorizationProvider';
import { NotificationProvider } from 'app/common/context/useNotification';
import { CustomNotification } from 'app/common/components/elements/CustomNotification';
import { theme } from 'app/common/styles/theme';
import { AuthProvider } from '../app/common/context/useAuthContext';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import { UserActivityProvider } from 'app/common/context/useUserActivity';
import ErrorBoundary from 'app/common/components/elements/ErrorBoundary'

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const onRedirectCallback = (appState) => {
  // Use Next.js's Router.replace method to replace the url
  Router.replace(appState?.returnTo || '/');
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const UniversalApp = (): JSX.Element => (
    <>
      <Head>
        <title>Frontent client</title>
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

  if (typeof window === 'undefined') {
    return <UniversalApp />
  } else {
    //const amplitude = require('amplitude-js');
    const amplitude = require('amplitude-js').default;
    //debugger;
    const amplitudeInstance: AmplitudeClient = amplitude.getInstance();

    // https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
    amplitudeInstance.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, null, {
      logLevel: process.env.APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
      includeGclid: true,
      includeReferrer: true, // https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
      includeUtm: true,
      // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
      onError: (error): void => {
        //Sentry.captureException(error);
        console.error(error); // eslint-disable-line no-console
      },
    });

    amplitudeInstance.setVersionName(process.env.NEXT_PUBLIC_APP_VERSION); // e.g: 1.0.0
    return <AmplitudeProvider
      amplitudeInstance={amplitude.getInstance()}
      apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY}
    >
      <UniversalApp />
    </AmplitudeProvider>
  }
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
//export default appWithTranslation(MyApp);

export default dynamic(() => Promise.resolve(appWithTranslation(MyApp)), {
  ssr: false,
});
