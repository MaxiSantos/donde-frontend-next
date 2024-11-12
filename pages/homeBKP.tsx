import { GetStaticProps } from "next";
import { Default } from "app/common/components/layouts/default";
import Home from "app/components/pageTemplate/Home";
import { getPageProps } from 'app/common/lib/page/pageNextProps';

/*
TODO: should we use https://nextjs.org/docs/basic-features/script#afterinteractive Script Loader for responsivevoice?
*/
const App = () => (
  <Default>
    <Home />
  </Default>
);

export const getStaticProps: GetStaticProps = async (context) => {
  return await getPageProps({
    context,
    auth: {
      name: "home",
    }
  })
}

export default App;
