const { PDFDocument } = require('pdf-lib');

exports.mergePDFs = async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ error: 'At least 2 files required' });
        }

        const mergedPdf = await PDFDocument.create();

        for (const file of req.files) {
            const pdf = await PDFDocument.load(file.buffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const pdfBytes = await mergedPdf.save();
        
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="merged.pdf"',
            'Content-Length': pdfBytes.length
        });

        res.send(Buffer.from(pdfBytes));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'PDF merging failed' });
    }
};