import { GetStaticProps } from 'next';
import { Default } from 'app/common/components/layouts/default';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
import Publication from 'app/components/pageTemplate/Publication';
import { PublicationSearch } from 'app/components/pageTemplate/Publication/publicationSearch';

const App = () => (
  <Default top={<PublicationSearch />} pageTitle="publication">
    <Publication />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "publications",
    }
  })
}

export default App;
