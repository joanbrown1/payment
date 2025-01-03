const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.post('/espeesPayment', async (req, res) => {
  try {
      // Get the data from the request body
      const requestData = req.body;

      // Your API call logic using Axios
      const headersList = {
          "x-api-key": "CnNKYsdQ7iLdo61KMKV16nLhGoiMKiXaOsHhweU0",
          "Content-Type": "application/json"
      };

      const response = await axios.post("https://api.espees.org/v2/payment/product", requestData, {
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
