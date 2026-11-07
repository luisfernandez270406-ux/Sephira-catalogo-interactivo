import { useSelector } from "react-redux";
import Layout from "./components/layout/Layout";
import Landing from "./sections/Landing";
import Dashboard from "./sections/Dashboard";
import Products from "./sections/Products";
import Categories from "./sections/Categories";
import Orders from "./sections/Orders";
import About from "./sections/About";

const SECTIONS = {
  dashboard: Dashboard,
  products: Products,
  categories: Categories,
  orders: Orders,
  about: About,
};

const App = () => {
  const currentView = useSelector((state) => state.ui.currentView);

  if (currentView === "landing") {
    return <Landing />;
  }

  const Section = SECTIONS[currentView] ?? Dashboard;

  return (
    <Layout>
      <Section />
    </Layout>
  );
};

export default App;