import { Default } from "app/common/components/layouts/default";
import client from "app/common/lib/apolloClient";
import Store from "app/components/pageTemplate/Store/item";
import { GetStaticPaths, GetStaticProps } from 'next'
import { ALL_STORE_QUERY, STORE_BY_ID } from "app/common/graphql/queries/Store";
import { TextHelper } from "app/common/lib/text";
import { getPageProps } from "app/common/lib/page/pageNextProps";

const App = ({ data }) => (
  <Default>
    <Store data={data} />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  let response: any;
  /*const urlMap = params.reduce((acc, slug) => {
    acc[store.id] = TextHelper.slugify[store.name];
    return acc;
  }, {})*/

  const storeId = params.slug[0];
  const urlFromBrowser = params.slug[1];

  try {
    console.log("context.params")
    console.log(params)
    response = await client.query({ query: STORE_BY_ID, variables: { storeId: parseInt(storeId) } })

  } catch (err) {
    console.log("error in getStaticProps")
    console.log(err)
  };

  if (response.data.stores.length === 0) {
    return {
      props: {
        msg: 'store dosent exist'
      },
      notFound: true
    }
  } else {
    const friendlyUrl = TextHelper.slugify(response.data.stores[0].name);
    if (urlFromBrowser !== friendlyUrl) {
      return {
        props: {},
        redirect: {
          destination: `/store/${storeId}/${friendlyUrl}`,
          permanent: true,
          // statusCode: 301
        },
      }
    } else {
      let pageProps = await getPageProps({
        context,
        auth: {
          name: "storeItem",
        }
      });
      let _props = {
        props: {
          ...pageProps.props,
          // * NOTE: we are using { store: response.data.stores...} because STORE_BY_ID was using store query but that wasn't allowing to use a where clause with status equal ACTIVE. Hence we have to use stores query which returns an array of stores.
          data: { store: response.data.stores[0] },
          //...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
        },
        /*
        TODO for now we use revalidate, but we should update backend to do a on-deman revalidation on store update 
        https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
        */
        revalidate: 3600
      }
      console.log(_props)
      return _props;
    }
  }
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
  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#paths
  /* The value for each params object must match the parameters used in the page name
  store[id] hence I use id as a key in params object
  */
  const paths = data.stores.map((store) => ({
    params: {
      slug: [
        //https://stackoverflow.com/a/60814690
        store.id.toString(),
        TextHelper.slugify(store.name)
      ]
    }
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: true
  }
};

export default App;
