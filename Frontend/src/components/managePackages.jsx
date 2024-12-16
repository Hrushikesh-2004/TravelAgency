import React, { useEffect, useState } from 'react';
import '../css/style.css';

const AdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [operationType, setOperationType] = useState('.'); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: '',
    image: ''
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

  const handleAddPackage = () => {
    setOperationType('insert'); 
    setFormData({
      title: '',
      description: '',
      price: '',
      availableDates: '',
      image: ''
    });
    scrollToFormSection();
  };

  const handleEdit = (pkg) => {
    setOperationType('edit');
    setFormData({
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      availableDates: pkg.availableDates,
      image: pkg.image,
      id: pkg._id 
    });
    scrollToFormSection();
  };

  const handleDelete = async (pkgId) => {
    try {
      const response = await fetch(`https://travelagency-backend-fc0u.onrender.com/admin/packages/${pkgId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setPackages(packages.filter(pkg => pkg._id !== pkgId));
      } else {
        alert('Failed to delete package.');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseForm = () => {
    setOperationType(''); // Reset operationType
    setFormData({
      title: '',
      description: '',
      price: '',
      availableDates: '',
      image: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = operationType === 'edit' ? 'PUT' : 'POST';
    const endpoint = operationType === 'edit'
      ? `https://travelagency-backend-fc0u.onrender.com/admin/packages/${formData.id}` 
      : 'https://travelagency-backend-fc0u.onrender.com/admin/packages';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        if (operationType === 'edit') {
          setPackages(packages.map(pkg => (pkg._id === data._id ? data : pkg)));
        } else {
          setPackages([...packages, data]);
        }
        handleCloseForm(); 
      } else {
        const error = await response.json();
        alert(`Failed to save package: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const scrollToFormSection = () => {
    const formSection = document.getElementById('package-form-container');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="container admin-status">
        <p>Loading packages...</p>
      </div>
    );
  }

  return (
    <div className="container admin-panel">
      <h1 className="admin-panel-title">Manage Travel Packages</h1>
      <button className="add-button" onClick={handleAddPackage}><strong>+</strong> Add Package</button>
      
      <div className="package-container grid grid-auto">
        {packages.map((pkg) => (
          <div key={pkg._id} className="package">
            <img src={pkg.image} alt={pkg.title} className="package-image" />
            <h2 className="package-content-title">{pkg.title}</h2>
            <p className="package-content-item">{pkg.description}</p>
            <p className="package-content-item">Price: {pkg.price}</p>
            <p className="package-content-item">Available Dates: {pkg.availableDates}</p>
            <button className="edit-button" onClick={() => handleEdit(pkg)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(pkg._id)}>Delete</button>
          </div>
        ))}
      </div>

      {operationType && (
        <div id="package-form-container" className="form-container">
          <button className="close-button" onClick={handleCloseForm}>✖</button>
          <h2>{operationType === 'edit' ? 'Edit Package' : 'Add New Package'}</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required />

            <label htmlFor="availableDates">Available Dates:</label>
            <input type="text" id="availableDates" name="availableDates" value={formData.availableDates} onChange={handleInputChange} required />

            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} required />

            <button type="submit">{operationType === 'edit' ? 'Update Package' : 'Add Package'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
