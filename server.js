const express = require('express');
const path = require('path');
const cors = require('cors');
const toolRoutes = require('./routes/toolRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. API Routes (Must be defined before static files)
app.use('/api', toolRoutes);

// 3. Production / Railway Setup
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'frontend', 'dist');
    
    // Serve static files from the frontend/dist folder
    app.use(express.static(distPath));

    /**
     * FIX: Use '(.*)' instead of '*' 
     * Newer versions of path-to-regexp (used by Express) require parameters to be named 
     * or wrapped in parentheses to avoid the PathError seen in your logs.
     */
    app.get('(.*)', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    // Basic route for development mode
    app.get('/', (req, res) => {
        res.send("Backend is running. Start the frontend with 'npm run dev' inside the frontend folder.");
    });
}

// 4. Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is live and listening on port ${PORT}`);
});