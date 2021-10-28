import { HomeSearch } from "app/components/pageTemplate/Home/homeSearch";
import { Default } from "../app/common/components/layouts/default";
import Home from "../app/components/pageTemplate/Home";

const App = () => (
  <Default top={<HomeSearch />}>
    <Home />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    }
  };
}

export default App;
