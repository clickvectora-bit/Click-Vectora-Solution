const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and static assets
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'studio.html'));
});

app.get('/studio', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'studio.html'));
});

// Fallback error-handling for Express 5 routing
app.use((req, res) => {
    res.status(404).send("Page not found - Click Vectora Solution");
});

app.listen(PORT, () => {
    console.log(`Server is running live on port ${PORT}`);
});