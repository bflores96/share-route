import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import "./App.css";
import Home from "./home/Home";
import About from "./aboutMe/About";
import ItineraryJapan2024 from "./itinerary/ItineraryJapan2024";
import ItineraryJapan2023 from "./itinerary/ItineraryJapan2023";
import ItineraryParis2024 from "./itinerary/ItineraryParis2024";
import CoinGuide from "./coinguide/CoinGuide";
import FAQ from "./faq/FAQ";
import Forum from "./forum/forum";
import { UserProvider } from "./components/UserContext";

const App = () => {
  return (
    <UserProvider>
      {" "}
      {/* Envuelve la app con UserProvider */}
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/itinerary/japan-2024"
              element={<ItineraryJapan2024 />}
            />
            <Route
              path="/itinerary/japan-2023"
              element={<ItineraryJapan2023 />}
            />
            <Route
              path="/itinerary/paris-2024"
              element={<ItineraryParis2024 />}
            />
            <Route path="/coinguide" element={<CoinGuide />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
