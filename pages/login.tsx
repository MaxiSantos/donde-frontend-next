import { Default } from '../app/common/components/layouts/default';
import { Login } from '../app/common/components/pageTemplate/Auth/Login';

const App = () => (
  <Default pageTitle="Login">
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
