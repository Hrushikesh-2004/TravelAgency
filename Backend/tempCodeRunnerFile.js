if (!customerName || !email || !phoneNumber || !numberOfTravelers || !packageId) {
      return res.status(400).json({ error: 'All fields are required' });
    