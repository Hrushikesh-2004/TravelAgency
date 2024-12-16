import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/home';
// import AdminPanel from './components/AdminPannel';
import Bookings from './components/Bookings';
import ManagePackages from './components/managePackages';
import './css/style.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/admin"
            element={
              <>
                <Navbar />
                <Bookings /> 
              </>
            }
          />
          <Route
            path="/admin/viewBookings"
            element={
              <>
                <Navbar />
                <Bookings />
              </>
            }
          />
          <Route
            path="/admin/managePackages"
            element={
              <>
                <Navbar />
                <ManagePackages />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

