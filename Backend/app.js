const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const ver = require('./Single_Handle_Page/verdict');
const self=require('./Single_Handle_Page/self');


// Parse JSON request bodies
app.use(bodyParser.json());

// Custom function to calculate the result
function calculateResult(username) {
  // Perform your calculations or logic here based on the provided username
  // For this example, let's calculate the length of the username
  const result = username.length;
  return result;
}

// Handle POST requests to '/calculate'
app.post('/calculate', async(req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      throw new Error('Username not provided');
    }

    // Call the custom function and pass the username
    const self1 = await self.self(username);
    // console.log(verdict1);

    res.json({ self1 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const port = 3000; // Change this to the desired port number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});