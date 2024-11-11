const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for handling Taxi registration form
app.post('/register/taxi', (req, res) => {
    const formData = req.body;
    console.log("Taxi Registration Data:", formData);
    res.json({ message: 'Taxi registration received', data: formData });
});

// Route for handling Courier registration form
app.post('/register/courier', (req, res) => {
    const formData = req.body;
    console.log("Courier Registration Data:", formData);
    res.json({ message: 'Courier registration received', data: formData });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});