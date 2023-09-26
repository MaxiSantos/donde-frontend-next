import { GetStaticProps } from 'next';
import { Default } from 'app/common/components/layouts/default';
import { Signup } from 'app/common/components/pageTemplate/Auth/Signup';
import { getPageProps } from 'app/common/lib/page/pageNextProps';

const App = () => (
  <Default>
    <Signup />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "signup",
    }
  })
}

export default App;
