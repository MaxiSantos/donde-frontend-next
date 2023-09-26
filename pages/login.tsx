import { GetStaticProps } from 'next';
import { Default } from '../app/common/components/layouts/default';
import { Login } from '../app/common/components/pageTemplate/Auth/Login';
import { getPageProps } from 'app/common/lib/page/pageNextProps';

const App = () => (
  <Default>
    <Login client='user' />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "signin",
    }
  })
}

export default App;
