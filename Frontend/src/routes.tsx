import { Routes, Route } from "react-router-dom";
import  Home from "./pages/Home/Home.tsx"; 
import Contact from "./pages/Contact/Contact.tsx"; 
import AdminNewsletter from "./components/Newsletter/AdminNewsletter.tsx";
import AddProduct from "./pages/Admin/AddProduct.tsx";
import Stock from "./pages/Admin/Stock.tsx";
import AddPromotion from "./pages/Admin/AddPromotion.tsx";
import AuthPage from "./pages/Auth/AuthPages.tsx";
import Catalogues from "./pages/Catalogues/Catalogues.tsx";
import Ateliers from "./pages/Ateliers/Ateliers.tsx";
import Philosophie from "./pages/Philosophie/Philosophie.tsx";
import Equipe from "./pages/Equipe/Equipe.tsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produits" element={<Catalogues />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ateliers" element={<Ateliers />} />
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/philosophie" element={<Philosophie />} />
            <Route path="/admin" element={<AdminNewsletter/>} />
            <Route path="/admin/ajout-produit" element={<AddProduct/>} />
            <Route path="/admin/ajout-produit/:id" element={<AddProduct/>} />
            <Route path="/admin/promotion-produit" element={<AddPromotion/>} />
            <Route path="/admin/stock-produit" element={<Stock/>} />
            <Route path="/connexion" element={<AuthPage/>} />
        </Routes>
    )
}

export default AppRoutes; 
