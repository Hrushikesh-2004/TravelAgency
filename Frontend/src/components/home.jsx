import React, { useEffect, useState } from 'react';
import '../css/style.css';

const HomePage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: ''
  });

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('https://travelagency-backend-fc0u.onrender.com/packages'); 
        const data = await response.json();
        setPackages(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    const formSection = document.getElementById('booking-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseForm = () => {
    setSelectedPackage(null);
  };

  const calculateTotalPrice = () => {
    return selectedPackage.price * formData.travelers;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://travelagency-backend-fc0u.onrender.com/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, packageId: selectedPackage._id, totalPrice: calculateTotalPrice() })
      });

      if (response.ok) {
        const data = await response.json();
        alert('Booking successful! Invoice has been generated.');
        console.log(data); 
        setSelectedPackage(null);
      } else {
        const error = await response.json();
        alert(`Failed to save booking: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  if (loading) {
    return (
      <div className="container home-status">
        <p>Loading packages...</p>
      </div>
    );
  }

  return (
    <div>
      <nav>
      <div className="navbar-section container">
        <div className="navbar-logo">
          <ul>
            <h1 className="nav-title">Traveler</h1>
          </ul>
        </div>
      </div>
      </nav>
    <div className="container package-section">
      <h1 className="package-section-title">Available Travel Packages</h1>
      <div className="container package-container grid grid-auto">
        {packages.map((pkg) => (
          <div key={pkg._id} className="package">
            <img src={pkg.image} alt={pkg.title} className="package-image" />
            <h2 className="package-content-title">{pkg.title}</h2>
            <p className="package-content-item"><strong>Description: </strong>{pkg.description}</p>
            <p className="package-content-item"><strong>Price: </strong> {pkg.price}</p>
            <p className="package-content-item"><strong>Available Dates: </strong> {pkg.availableDates}</p>
            <button
              className="package-button"
              onClick={() => handleBookNow(pkg)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <div id="booking-form" className=" container form-container">
          <button className="close-button" onClick={handleCloseForm}>✖</button>
          <h2>Booking Form for {selectedPackage.title}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />

            <label htmlFor="travelers">Number of Travelers:</label>
            <input type="number" id="travelers" name="travelers" min="1" value={formData.travelers} onChange={handleInputChange} required />

            <label htmlFor="specialRequests">Special Requests:</label>
            <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} />

            <h3>Total Price: ${calculateTotalPrice()}</h3>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default HomePage;
