import React from 'react';
import '../css/style.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
      <div className="navbar-section container">
        <div className="navbar-logo">
          <ul>
            <h1 className="nav-title">Traveler</h1>
          </ul>
        </div>
      

          <div className="navbar flex">
            <ul>
              <li className="nav-item">
                <Link to='/admin/viewBookings'>
                  viewbookings
                </Link>
    
              </li>
              <li className="nav-item">
              <Link to='/admin/managePackages'>
                  managePackages
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
    </nav>
  );
};

export default Navbar;
