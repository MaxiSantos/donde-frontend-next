import { Default } from 'app/common/components/layouts/default';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
import Store from 'app/components/pageTemplate/Store';
import { StoreSearch } from 'app/components/pageTemplate/Store/storeSearch';

const App = () => (
  <Default top={<StoreSearch />} pageTitle="store">
    <Store />
  </Default>
);

export async function getStaticProps(context) {
  return await getPageProps({
    context,
    auth: {
      name: "store",
    }
  })
}

export default App;
