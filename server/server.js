const authenticateToken = require('./middleware/auth');  //Loads JWT middleware.

const authRoutes = require('./routes/auth');  //Loads login routes.

const express = require('express');  // Loads Express framework.

const cors = require('cors'); //frontend and backend to communicate.

require('dotenv').config(); //Loads environment variables.

const app = express(); // create a web server using express framework.
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // express.json() converts incoming JSON into JavaScript objects.

app.use('/api/auth', authRoutes);

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'You accessed a protected route', user: req.user }); // protected API.
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' }); // check if server is running.  
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);  //Starts Server
});