const Package = require('../models/Package');

const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({});
    res.status(200).json(packages);
    // console.log(packages)
  } catch (err) {
    console.error('Error fetching packages:', err);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
};

const createPackage = async (req, res) => {
  try {
    const { title, description, price, image, availableDates } = req.body;

    const newPackage = new Package({
      title,
      description,
      price,
      image,
      availableDates,
    });

    await newPackage.save();
    res.status(201).json({ message: 'Package created successfully', newPackage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create package' });
  }
};

const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(200).json({ message: 'Package updated successfully', updatedPackage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update package' });
  }
};

const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete package' });
  }
};

module.exports = { getAllPackages, createPackage, updatePackage, deletePackage };
