const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (logos, assets, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'studio')));

// Serve the main PDF Studio interface from the 'views' folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running smoothly at http://localhost:${PORT}`);
});