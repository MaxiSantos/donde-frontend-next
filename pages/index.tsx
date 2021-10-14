import type { NextPage } from 'next'
import Home from './home';

const Index: NextPage = () => {
  return <Home />;
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    }
  };
}

export default Index
