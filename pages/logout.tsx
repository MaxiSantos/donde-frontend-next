import { Default } from 'app/common/components/layouts/default';
import { Logout } from 'app/common/components/pageTemplate/Auth/Logout';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
import { GetStaticProps } from 'next';

const App = () => (
  <Default>
    <Logout />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "logout",
    }
  })
}

export default App;
