import { Default } from "app/common/components/layouts/default";
import { TranslationHelper } from "app/common/lib/translation";
import Store from "app/components/pageTemplate/Store/item";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPaths } from 'next'
import { ALL_STORE_QUERY, STORE_BY_ID } from "app/common/graphql/queries/Store";
import { useQuery } from "@apollo/client";
import client from "app/common/lib/apolloClient";
import { domainToASCII } from "url";

const App = ({ data }) => (
  <Default>
    <Store data={data} />
  </Default>
);

export async function getStaticProps(context) {

  let sst: any;
  let response: any;
  try {
    sst = await serverSideTranslations(context.locale, TranslationHelper.getCommonSource());
    response = await client.query({ query: STORE_BY_ID, variables: { storeId: parseInt(context.params.id) } })

  } catch (err) {
    console.log("error in getStaticProps")
    console.log({ err })
  };

  return {
    props: {
      protected: true,
      data: response.data,
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
  // Call an external API endpoint to get posts
  const { data } = await client.query({ query: ALL_STORE_QUERY })

  // Get the paths we want to pre-render based on stores
  const paths = data.stores.map((store) => ({
    params: { id: store.id.toString() }, //https://stackoverflow.com/a/60814690
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
};

export default App;
