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
app.use('/api', toolRoutes);

// 3. Production / Railway Setup
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'frontend', 'dist');
    
    // Serve static files from the build folder
    app.use(express.static(distPath));

    /**
     * FINAL FIX FOR PathError:
     * Instead of using a string like '*' or '/:path*', we use a 
     * Regex Literal /^(?!\/api).+/
     * This tells Express: "Match anything that DOES NOT start with /api"
     * Since it's a regex literal, path-to-regexp will not attempt to parse it as a string.
     */
    app.get(/^(?!\/api).+/, (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send("Backend is running.");
    });
}

// 4. Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is live on port ${PORT}`);
});