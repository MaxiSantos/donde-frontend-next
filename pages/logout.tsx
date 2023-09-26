import { GetServerSideProps } from 'next';
import { Default } from 'app/common/components/layouts/default';
import { Logout } from 'app/common/components/pageTemplate/Auth/Logout';
import { getPageProps } from 'app/common/lib/page/pageNextProps';

const App = () => (
  <Default>
    <Logout />
  </Default>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "logout",
    }
  })
}

export default App;
