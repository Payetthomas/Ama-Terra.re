import CardProduct from "../../components/Cards/Card/Card";
import "./home.scss";
import { FontAwesomeIcon } from "@fortawesome";
import he from "../../assets/he-card.png";


const Home = () => {
   return (<div className="home-page">

            <div className="home-image"></div>

            <div className="home-content">

               <h2 className="home-content--title">Les nouveautés</h2>

               <div className="home-card">

                  <CardProduct 
                  title="Huile" 
                  price={22} 
                  image={he} 
                  description="les huiles c'est cool"
                  />
               
                  <CardProduct 
                  title="Huile" 
                  price={22} 
                  image={he} 
                  description="les huiles c'est cool"
                  />

                  <CardProduct 
                  title="Huile" 
                  price={22} 
                  image={he} 
                  description="les huiles c'est cool"
                  />

               </div>
            </div>


      </div>)
};

export default Home; 