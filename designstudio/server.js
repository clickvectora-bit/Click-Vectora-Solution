const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// --- Your Application Routes ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'studio/index.html'));
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Here is your data!' });
});

// --- Catch-all 404 Route ---
app.all('/{ *path }', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    path: req.originalUrl 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});