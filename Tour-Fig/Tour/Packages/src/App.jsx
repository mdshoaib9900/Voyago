import React, { useState,useEffect } from "react";
import { SearchResults } from "./components/SearchResults";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BookingProvider } from "./components/BookingContext";
import Home from "./components/Home";
import ContactPage from "./components/ContactPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TourDetails from "./components/TourDetails";
import Purchase from "./components/purchase";
import YourDetails from "./components/YourDetails";
import OrderSuccess from "./components/OrderSuccess";
import Payment from "./components/Payment";
import TourPackages from "./components/TourPackages";

// ✅ NEW import for API calls
import { fetchTours } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [filteredTours, setFilteredTours] = useState([]);
  const [sortOption, setSortOption] = useState("");
  
  // This effect runs when the app starts to check for a logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout handler function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // You can optionally navigate to the home page after logout
    // window.location.href = '/'; 
  };
  const navigate = useNavigate();

  // ✅ Updated: Fetch tours from backend instead of local data
  // Parent
const handleSearch = (results) => {
  setFilteredTours(results);
  navigate("/search");
};


  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <>
      <Header  user={user} setUser={setUser} onLogout={handleLogout} />
      <BookingProvider>
      <Routes>
        <Route path="/" element={<Home onSearch={handleSearch} />} />
      <Route path="/OrderSuccess" element={<OrderSuccess />} />
        <Route
          path="/search"
          element={
            <SearchResults
              tours={filteredTours}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/details" element={<YourDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/tour-packages" element={<TourPackages />} />
      </Routes>
      <Footer />
      </BookingProvider>
    </>
  );
}

export default App;
