import type { GetStaticProps, NextPage } from 'next'
import Activate from '../../app/common/pages/auth/activate'
import Head from 'next/head';
import { getPageProps } from 'app/common/lib/page/pageNextProps';

const Index: NextPage = () => {
  return <>
    <Head>
      <meta name="robots" content="noindex,nofollow" key="robot" />
    </Head>
    <Activate />
  </>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "activate",
    }
  })
}

export default Index
