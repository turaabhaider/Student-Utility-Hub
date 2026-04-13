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

// 2. API Routes
// These must stay ABOVE the static/catch-all routes
app.use('/api', toolRoutes);

// 3. Production / Railway Setup
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'frontend', 'dist');
    
    // Serve static files from the build folder
    app.use(express.static(distPath));

    /**
     * THE MASTER FIX FOR YOUR PathError:
     * In Node v22/Express environments using path-to-regexp v8+,
     * you MUST use a named parameter for wildcards.
     * '/:path*' tells the server to match any path and name it "path".
     */
    app.get('/:path*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send("Backend is running. Start the frontend with 'npm run dev'.");
    });
}

// 4. Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});