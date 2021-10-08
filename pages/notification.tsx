import { Default } from '../app/common/components/layouts/default';
import Notification from '../app/components/pageTemplate/Notification';

const App = () => (
  <Default>
    <Notification />
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
