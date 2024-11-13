const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // For form data

// Connect to MongoDB
mongoose.connect('mongodb+srv://david:89CyjVE4LV7yLVpL@taxi.hs5jn.mongodb.net/?retryWrites=true&w=majority&appName=Taxi', {
   useNewUrlParser: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Taxi registration model
const TaxiRegistration = mongoose.model('TaxiRegistration', new mongoose.Schema({
   fullName: String,
   phoneNumber: String,
   licenseNumber: String,
   issueDate: Date,
   validUntil: Date,
   carModel: String,
   carColor: String,
   releaseYear: Number,
   registrationNumber: String,
   city: String
}));

// Route to handle form submission
app.post('/register/taxi', async (req, res) => {
   try {
      const taxiData = new TaxiRegistration({
         fullName: req.body.nameInput,
         phoneNumber: req.body.telNumber,
         licenseNumber: req.body.licNumber,
         issueDate: req.body.date,
         validUntil: req.body.valid,
         carModel: req.body.carModel,
         carColor: req.body.carColor,
         releaseYear: req.body.releaseDate,
         registrationNumber: req.body.regionNumber,
         city: req.body.city
      });
      await taxiData.save();
      res.status(201).send('Taxi registration saved successfully');
   } catch (error) {
      res.status(400).send('Error saving registration data: ' + error.message);
   }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));