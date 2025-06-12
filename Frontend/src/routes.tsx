import { Routes, Route } from "react-router-dom";
import  Home from "./pages/Home/Home.tsx"; 
import Contact from "./pages/Contact/Contact.tsx"; 
import AdminNewsletter from "./components/Newsletter/AdminNewsletter.tsx";
import AddProduct from "./pages/Admin/AddProduct.tsx";
import Stock from "./pages/Admin/Stock.tsx";
import AuthPage from "./pages/Auth/AuthPages.tsx";
import Catalogues from "./pages/Catalogues/Catalogues.tsx";
import Ateliers from "./pages/Ateliers/Ateliers.tsx";
import Equipe from "./pages/Equipe/Equipe.tsx";
import { useAuth } from "./AuthContext/AuthContext.tsx";
import AdminPromotions from "./pages/Admin/AdminPromotions.tsx";
import CreateEvent from "./pages/Admin/CreateEvent.tsx";
import Event from "./pages/Admin/Event.tsx";


const AppRoutes = () => {

    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produits" element={<Catalogues />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ateliers" element={<Ateliers />} />
            <Route path="/equipe" element={<Equipe />} />
            {user?.role === "admin" && 
            (<>
            <Route path="/admin/newsletter" element={<AdminNewsletter/>} />
            <Route path="/admin/ajout-produit" element={<AddProduct/>} />
            <Route path="/admin/ajout-produit/:id" element={<AddProduct/>} />
            <Route path="/admin/promotion-produit" element={<AdminPromotions/>} />
            <Route path="/admin/stock-produit" element={<Stock/>} />
            <Route path="/admin/event" element={<Event/>} />
            <Route path="/admin/ajouter-event" element={<CreateEvent/>} />
            </>
            )}
            <Route path="/connexion" element={<AuthPage/>} />
        </Routes>
    )
}

export default AppRoutes; 
