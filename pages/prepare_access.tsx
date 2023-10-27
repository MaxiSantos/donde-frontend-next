import { Default } from 'app/common/components/layouts/default';
import { PrepareAccess } from 'app/common/components/pageTemplate/Auth/PrepareAccess';
import { getPageProps } from 'app/common/lib/page/pageNextProps';
import { GetServerSideProps } from 'next';
import { getProviders } from "next-auth/react";

const App = ({ providers, csrfToken }) => (
  <Default>
    <PrepareAccess client='user' providers={providers} />
  </Default>
);

//export const getStaticProps: GetStaticProps = async (context) => {
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  const providers = await getProviders();
  //const session = await getServerSession(req, res, authOptions);
  const commonPageProps = await getPageProps({
    context,
    auth: {
      name: "signin",
    }
  });
  const { p = '/' } = query;
  /*if(session){
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }*/
  return {
    props: {
      ...commonPageProps.props,
      providers,
    }
  }
}

export default App;
