import React from "react";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Newsletter from "./components/Newsletter/Newsletter";
import './style.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="test">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Newsletter/>
      <Footer />
    </div>
    </div>
  );
};

export default App;
