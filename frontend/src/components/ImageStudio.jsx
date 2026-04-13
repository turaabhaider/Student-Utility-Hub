import { useState } from 'react';

export default function ImageStudio() {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState('webp');
    const [status, setStatus] = useState('idle');

    const handleConvert = async () => {
        if (!file) return;
        setStatus('processing');

        const formData = new FormData();
        formData.append('image', file);
        formData.append('format', format);

        try {
            const res = await fetch('https://student-utility-hub-production.up.railway.app/api/image-convert', {
    method: 'POST',
    body: formData,
});

            if (!res.ok) throw new Error('Conversion failed');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Hub-Studio-${Date.now()}.${format}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            console.error(err);
            alert("Connection to backend failed. Make sure your server is running on port 3000!");
            setStatus('idle');
        }
    };

    return (
        <div className="tool-inner animate-in">
            <div className="tool-header">
                <h2>🖼️ Image Studio</h2>
                <p>Convert and optimize images with privacy-first processing.</p>
            </div>

            <div className={`drop-zone glass-card ${file ? 'has-file' : ''}`}>
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    accept="image/*" 
                    className="file-input"
                />
                <div className="drop-zone-content">
                    <span className="upload-icon">{file ? '✨' : '☁️'}</span>
                    <p>{file ? file.name : "Click or drag image to upload"}</p>
                    {file && (
                        <button 
                            className="clear-file" 
                            onClick={(e) => { 
                                e.preventDefault(); 
                                e.stopPropagation(); 
                                setFile(null); 
                            }}
                        >
                            Remove File
                        </button>
                    )}
                </div>
            </div>

            <div className="settings-grid">
                <div className="input-field">
                    <label>Target Format</label>
                    <select className="main-input" value={format} onChange={(e) => setFormat(e.target.value)}>
                        <option value="webp">WebP (Best for Web)</option>
                        <option value="png">PNG (Lossless)</option>
                        <option value="jpg">JPG (Standard)</option>
                    </select>
                </div>
            </div>

            <button 
                onClick={handleConvert} 
                disabled={!file || status === 'processing'} 
                className="btn-primary"
            >
                {status === 'processing' ? 'Optimizing...' : status === 'success' ? 'Downloaded! 🎉' : 'Convert Now'}
            </button>
        </div>
    );
}