const express = require('express');
const cors = require('cors');
const path = require('path'); // Added path
require('dotenv').config();

const toolRoutes = require('./routes/toolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', toolRoutes);

// --- Production / Railway Setup ---
if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'frontend', 'dist');
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    // Basic route for dev mode if frontend isn't built yet
    app.get('/', (req, res) => {
        res.send('Backend is running. Start the frontend with "npm run client"');
    });
}



app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is live and listening on port ${PORT}`);
});