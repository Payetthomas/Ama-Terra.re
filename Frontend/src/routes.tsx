import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext/AuthContext.tsx";

// Lazy loaded components
const AdminNewsletter = React.lazy(() => import("./components/Newsletter/AdminNewsletter.tsx"));
const AddProduct = React.lazy(() => import("./pages/Admin/AddProduct.tsx"));
const AdminPromotions = React.lazy(() => import("./pages/Admin/AdminPromotions.tsx"));
const CreateEvent = React.lazy(() => import("./pages/Admin/CreateEvent.tsx"));
const Event = React.lazy(() => import("./pages/Admin/Event.tsx"));
const Stock = React.lazy(() => import("./pages/Admin/Stock.tsx"));
const Ateliers = React.lazy(() => import("./pages/Ateliers/Ateliers.tsx"));
const AuthPage = React.lazy(() => import("./pages/Auth/AuthPages.tsx"));
const Catalogues = React.lazy(() => import("./pages/Catalogues/Catalogues.tsx"));
const Contact = React.lazy(() => import("./pages/Contact/Contact.tsx"));
const Equipe = React.lazy(() => import("./pages/Equipe/Equipe.tsx"));
const Home = React.lazy(() => import("./pages/Home/Home.tsx"));

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produits" element={<Catalogues />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ateliers" element={<Ateliers />} />
                <Route path="/equipe" element={<Equipe />} />
                {user?.role === "admin" && (
                    <>
                        <Route path="/admin/newsletter" element={<AdminNewsletter />} />
                        <Route path="/admin/ajout-produit" element={<AddProduct />} />
                        <Route path="/admin/ajout-produit/:id" element={<AddProduct />} />
                        <Route path="/admin/promotion-produit" element={<AdminPromotions />} />
                        <Route path="/admin/stock-produit" element={<Stock />} />
                        <Route path="/admin/event" element={<Event />} />
                        <Route path="/admin/ajouter-event" element={<CreateEvent />} />
                    </>
                )}
                <Route path="/connexion" element={<AuthPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
