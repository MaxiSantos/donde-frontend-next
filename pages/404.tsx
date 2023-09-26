import { GetStaticProps } from 'next';
import { Default } from 'app/common/components/layouts/default';
import { NotFound } from 'app/common/components/pageTemplate/404';
import { getPageProps } from 'app/common/lib/page/pageNextProps';

const App = () => (
  <Default>
    <NotFound />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "404",
    }
  })
}

export default App;
