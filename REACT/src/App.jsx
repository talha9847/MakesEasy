import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sign from "./components/Sign";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import { Dashboard } from "./AdminComponents/Dashboard";
import User from "./AdminComponents/User"
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
            <Route path="/signup" element={<Sign />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/users" element={<User/>}/>
            {/* Add other routes as needed */}
          </Routes>
        </div>
        <Footer /> {/* Footer will stay at the bottom */}
      </div>
    </Router>
  );
};

export default App;
