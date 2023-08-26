require('dotenv').config();
const express = require('express');
const app = express();
const cors=require('cors')
const bodyParser = require('body-parser');
// const ver = require('./Single_Handle_Page/verdict');
const self=require('./Single_Handle_Page/self');
const comapre=require('./Compare_Handle_Page/compare');


// Parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());


// Handle POST requests to '/calculate'

app.post('/analyze', async(req, res) => {

  try {
    const { username } = req.body;
    if (!username) {
      throw new Error('Username not provided');
    }

    // Call the custom function and pass the username
    const self1 = await self.self(username);
    // console.log(verdict1);
    // console.log(self1);

    res.json({ self1 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Handle POST requests to '/compare'
// Route to calculate the result based on the usernames
app.post('/compare', async(req, res) => {
  const { username1, username2 } = req.body;

  if (!username1 || !username2) {
    return res.status(400).json({ error: 'Username1 or Username2 not provided' });
  }

  // Call the custom function and pass the usernames
  const result = await comapre.compare(username1,username2);

  res.json({ result });
});


// Catch-all route for non-existent routes
app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 8080; // Change this to the desired port number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
