import { useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Newsletter from "./components/Newsletter/Newsletter";
import AppRoutes from "./routes";
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
