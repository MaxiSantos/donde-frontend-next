import { GetStaticProps } from 'next';
import { Default } from 'app/common/components/layouts/default';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
import Notification from 'app/components/pageTemplate/Notification';

const App = () => (
  <Default pageTitle="notification">
    <Notification />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "notifications",
    }
  })
}

export default App;
