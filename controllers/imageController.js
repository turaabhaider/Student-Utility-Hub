const sharp = require('sharp');

exports.convertImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }

        const targetFormat = req.body.format || 'webp';
        let pipeline = sharp(req.file.buffer);

        // --- Privacy & Performance ---
        // .withMetadata(false) removes GPS/Camera data for student privacy
        pipeline = pipeline.rotate().withMetadata(false); 

        // --- Format-Specific Optimization ---
        switch (targetFormat) {
            case 'webp':
                pipeline = pipeline.webp({ quality: 75, effort: 6 });
                break;
            case 'jpg':
            case 'jpeg':
                pipeline = pipeline.jpeg({ quality: 80, progressive: true });
                break;
            case 'png':
                pipeline = pipeline.png({ compressionLevel: 9, palette: true });
                break;
            default:
                pipeline = pipeline.toFormat(targetFormat);
        }

        const buffer = await pipeline.toBuffer();

        // Standard headers for file download
        res.set({
            'Content-Type': `image/${targetFormat}`,
            'Content-Disposition': `attachment; filename="Hub-Export-${Date.now()}.${targetFormat}"`,
            'Content-Length': buffer.length
        });

        res.send(buffer);
    } catch (err) {
        console.error('Image Processing Error:', err);
        res.status(500).json({ error: 'Conversion failed. Please check the file type.' });
    }
};