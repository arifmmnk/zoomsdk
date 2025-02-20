const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// OAuth Callback
app.get('/oauth/callback', async (req, res) => {
  const code = req.query.code;
  const tokenUrl = 'https://zoom.us/oauth/token';
  const auth = {
    auth: {
      username: process.env.ZOOM_CLIENT_ID,
      password: process.env.ZOOM_CLIENT_SECRET
    }
  };

  try {
    const response = await axios.post(tokenUrl, null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.ZOOM_REDIRECT_URL
      },
      ...auth
    });
    res.send(response.data);  // You can store the token here
  } catch (error) {
    res.status(500).send('Error retrieving OAuth token');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
