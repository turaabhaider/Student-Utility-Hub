const express = require('express');
const path = require('path');
const cors = require('cors');
const toolRoutes = require('./routes/toolRoutes'); // Ensure this folder exists in root

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. API Routes (Must come BEFORE static files)
app.use('/api', toolRoutes);

// 2. Serve Static Files (From the frontend/dist folder)
const distPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(distPath));

// 3. Catch-all Route for React Router (The fix for your PathError)
app.get('*', (req, res) => {
    // Check if we are in production and the file exists
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(distPath, 'index.html'));
    } else {
        res.send("Backend is running. Start frontend separately in dev mode.");
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});