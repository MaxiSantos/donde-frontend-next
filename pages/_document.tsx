// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import * as React from 'react'
import { renderStatic } from 'app/common/components/render'
import { EmotionHelper } from 'app/common/lib/emotion';

/* https://emotion.sh/docs/ssr#nextjs */

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
    // However, be aware that it can have global side effects.
    const cache = EmotionHelper.createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    /* eslint-disable */
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          (function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          }),
      });
    /* eslint-enable */

    const initialProps = await Document.getInitialProps(ctx);
    // This is important. It prevents emotion to render invalid HTML.
    // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyleTags,
      ],
    };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          {process.env.NEXT_PUBLIC_APP_STAGE !== 'PRODUCTION' && <meta name="robots" content="noindex,nofollow" key="robot" />}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
