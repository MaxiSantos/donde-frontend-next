import NProgress from 'nprogress';
import Router from 'next/router';
import dynamic from "next/dynamic";
import { ApolloProvider } from '@apollo/client';
import type { AppProps, AppContext } from 'next/app';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import '../app/common/styles/nprogress.css';
import '../app/common/styles/icons.css';
import "./_app.css";

import client from '../app/common/lib/apolloClient';
import AuthorizationProvider from '../app/common/lib/AuthorizationProvider';
import { NotificationProvider } from 'app/common/context/useNotification';
import { CustomNotification } from 'app/common/components/elements/CustomNotification';
import theme from '../app/common/styles/theme';
import { AuthProvider } from '../app/common/context/useAuthContext';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';

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
  return (
    <>
      <Head>
        <title>Frontent client</title>
        <link href="/favicon.ico" rel="icon" />
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <ThemeProvider theme={theme}>
        {<CssBaseline />}
        <ToastContainer />
        <AuthProvider>
          <NotificationProvider>
            <CustomNotification />
            <ApolloProvider client={client}>
              <AuthorizationProvider pageProps={pageProps}>
                <Component {...pageProps} />
              </AuthorizationProvider>
            </ApolloProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
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
