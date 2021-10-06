import { Default } from "../app/common/components/layouts/default";
import Home from "../app/components/pageTemplate/Home";

const App = () => (
  <Default withSearch={true}>
    <Home />
  </Default>
);

export default App;
