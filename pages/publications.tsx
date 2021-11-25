import { Default } from 'app/common/components/layouts/default';
import Publication from 'app/components/pageTemplate/Publication';
import { PublicationSearch } from 'app/components/pageTemplate/Publication/publicationSearch';

const App = () => (
  <Default top={<PublicationSearch />} pageTitle="Publication">
    <Publication />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    }
  };
}

export default App;
