import React from "react";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/Newsletter/Newsletter";
import { useLocation } from "react-router-dom";
import './style.css';

const App = () => {

    const location = useLocation();
    
    const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="app">
      <div className="test">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {!isAdmin && <Newsletter/>}
      <Footer />
    </div>
    </div>
  );
};

export default App;
