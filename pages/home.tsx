import { HomeSearch } from "app/components/pageTemplate/Home/homeSearch";
import { Default } from "../app/common/components/layouts/default";
import Home from "../app/components/pageTemplate/Home";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Script from 'next/script'
import { TranslationHelper } from "app/common/lib/translation";
import {
  AmplitudeProvider,
  Amplitude,
  LogOnMount
} from "@amplitude/react-amplitude";

const App = () => (
  <Default top={<HomeSearch />} pageTitle="home">
    <Script src="https://code.responsivevoice.org/responsivevoice.js?key=OWqODxS0"></Script>
    <Amplitude
      eventProperties={{
        scope: ["game"],
        "propiedad 1": "valor A",
        "propiedad 2": "valor B"
      }}
    >
      <LogOnMount eventType="home page visit" />
      <Home />
    </Amplitude>
  </Default>
);

export async function getStaticProps(context) {
  const props = {
    protected: true,
    ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
  }
  return {
    props
  };
}

export default App;
