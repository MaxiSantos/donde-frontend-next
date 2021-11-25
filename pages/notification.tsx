import { Default } from 'app/common/components/layouts/default';
import Notification from 'app/components/pageTemplate/Notification';
import { NotificationSearch } from 'app/components/pageTemplate/Notification/notificationSearch';

const App = () => (
  <Default pageTitle="Notification">
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
