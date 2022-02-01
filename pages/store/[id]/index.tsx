import { Default } from "app/common/components/layouts/default";
import { TranslationHelper } from "app/common/lib/translation";
import Store from "app/components/pageTemplate/Store/item";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths } from 'next'

const App = () => (
  <Default>
    <Store />
  </Default>
);

export async function getStaticProps(context) {
  let sst: any;
  //sst = await serverSideTranslations(context.locale, TranslationHelper.getCommonSource());
  try {
    sst = await serverSideTranslations(context.locale, TranslationHelper.getCommonSource());
  } catch (err) {
    console.log("error in getStaticProps")
    console.log({ err })
    //fetch('api/handler')
    /*fetch(process.env.NEXT_PUBLIC_ENDPOINT + '/api/handler', {
      method: 'POST',
      body: JSON.stringify(err) // body data type must match "Content-Type" header
    });*/
  };

  return {
    props: {
      protected: true,
      ...(sst),
    }
  };
}

/*export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}*/


export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "31" } },
    ],
    fallback: true
  };
};

export default App;
