const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://joannabrown833:KingsMatch123@atlascluster.k2ffw2e.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const ApiResponse = mongoose.model('ApiResponse', {
  payment_id: String,
  amount: String,
  currency: String,
  description: String,
  environment: String,
  merchant_callback_url: String,
  metadata: Object,
  status: String,
  merchant_name: String,
  payment_type: Object,
  email: String, // New field for email address
});

app.use(express.json());

app.get('/api/payment/:payment_id', async (req, res) => {
  const paymentId = req.params.payment_id;
  const userEmail = req.query.email; // Assuming the email is passed as a query parameter

  try {
    const apiResponse = await axios.get(`https://api.kingspay-gs.com/api/payment/${paymentId}`);
    
    // Save the response to MongoDB along with the email address
    const savedResponse = await ApiResponse.create({
      ...apiResponse.data,
      email: userEmail,
    });
    
    res.status(200).json(savedResponse);
  } catch (error) {
    console.error('Error calling external API:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to get all responses from the database
app.get('/api/payment', async (req, res) => {
    try {
      const responses = await ApiResponse.find();
      res.status(200).json(responses);
    } catch (error) {
      console.error('Error fetching responses from the database:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/initializePayment', async (req, res) => {
    try {
        // Get the data from the request body
        const requestData = req.body;

        // Your API call logic using Axios
        const headersList = {
            "Authorization": "Bearer sk_7v5fYDALRs9XtVTOu3Blma4gAhlwSS",
            "Content-Type": "application/json"
        };

        const response = await axios.post("https://api.kingspay-gs.com/api/payment/initialize", requestData, {
            headers: headersList
        });

        const responseData = response.data;

        // Send the response data back to the client
        res.json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/registration', async (req, res) => {
  try {
      // Get the data from the request body
      const requestData = req.body;

      const response = await axios.post("https://api.bloomx.live/api/auth/user/register", requestData);

      const responseData = response.data;

      // Send the response data back to the client
      res.json(responseData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
      // Get the data from the request body
      const requestData = req.body;

      const response = await axios.post("https://api.bloomx.live/api/auth/user/login", requestData);

      const responseData = response.data;

      // Send the response data back to the client
      res.json(responseData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
