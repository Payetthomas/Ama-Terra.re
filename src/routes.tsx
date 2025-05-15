import { Routes, Route } from "react-router-dom";
import  Home from "./pages/Home/Home.tsx"; 
import About from "./pages/About.tsx"; 
import Contact from "./pages/Contact.tsx"; 


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default AppRoutes; 
