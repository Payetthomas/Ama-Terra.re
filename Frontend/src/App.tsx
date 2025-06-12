import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/Newsletter/Newsletter";
import { useLocation } from "react-router-dom";
import "./styles/global.scss";

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="app">
      <div className="layout-wrapper">
        <Navbar />
        <main className="main">
          <AppRoutes />
        </main>
        {!isAdmin && <Newsletter />}
        <Footer />
      </div>
    </div>
  );
};

export default App;
