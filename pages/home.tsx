import { Default } from "../app/common/components/layouts/default";
import Home from "../app/components/pageTemplate/Home";

const App = () => (
  <Default withSearch={true}>
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
