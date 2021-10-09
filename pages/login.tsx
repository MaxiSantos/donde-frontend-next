import { Default } from '../app/common/components/layouts/default';
import { Login } from '../app/common/components/pageTemplate/Login';

const App = () => (
  <Default>
    <Login />
  </Default>
);

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
    }
  };
}

export default App;
