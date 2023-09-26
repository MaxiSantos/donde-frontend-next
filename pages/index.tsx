import type { GetStaticProps, NextPage } from 'next'
import Home from './home';
import { getPageProps } from 'app/common/lib/page/pageNextProps';

const Index: NextPage = () => {
  return <Home />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: 'home'
    }
  })
}

export default Index
