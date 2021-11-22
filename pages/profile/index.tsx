import { Default } from "app/common/components/layouts/default";
import { Profile } from "app/components/pageTemplate/Profile";

const App = () => (
  <Default pageTitle="Profile">
    <Profile />
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
