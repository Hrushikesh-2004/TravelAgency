import React, { useEffect, useState } from 'react';
import '../css/style.css';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/bookings'); 
        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="container home-status">
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="container home-status">
        <p>No bookings available.</p>
      </div>
    );
  }

  return (
    <div className="container booking-section">
      <h1 className="package-section-title">View Bookings</h1>
      <div className="package-container grid grid-auto">
        {bookings.map((booking) => (
          <div key={booking._id} className="package">
            <h2 className="package-content-title">Package Id: {booking.packageId}</h2>
            <p className="package-content-item"><strong>Email:</strong> {booking.email}</p>
            <p className="package-content-item"><strong>Phone:</strong> {booking.phoneNumber}</p>
            <p className="package-content-item"><strong>Travelers:</strong> {booking.numberOfTravelers}</p>
            <p className="package-content-item"><strong>Total Price:</strong> ${booking.totalPrice}</p>
            <p className="package-content-item"><strong>Special Requests:</strong> {booking.specialRequests || 'None'}</p>
          </div>

          
        ))}
      </div>
    </div>
  );
};

export default ViewBookings;
