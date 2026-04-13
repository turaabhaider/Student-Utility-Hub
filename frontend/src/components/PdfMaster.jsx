import { useState } from 'react';

export default function PdfMaster() {
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('idle');

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const handleMerge = async () => {
        if (files.length < 2) return alert("Please select at least 2 PDFs to merge.");
        setStatus('processing');

        const formData = new FormData();
        files.forEach(file => formData.append('pdfs', file));

        try {
            const res = await fetch('https://student-utility-hub-production.up.railway.app/api/pdf-merge', {
          method: 'POST',
         body: formData
          });

            if (!res.ok) throw new Error('Merge failed');

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Merged-Hub-Docs-${Date.now()}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            
            setStatus('success');
            setFiles([]); 
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            alert("Error: Make sure the backend is running and 'pdf-lib' is installed.");
            setStatus('idle');
        }
    };

    return (
        <div className="tool-inner animate-in">
            <div className="tool-header">
                <h2>📄 PDF Master</h2>
                <p>Combine multiple PDF documents into one secure file.</p>
            </div>

            <div className={`drop-zone glass-card ${files.length > 0 ? 'has-file' : ''}`}>
                <input 
                    type="file" 
                    multiple 
                    accept=".pdf"
                    onChange={handleFileChange} 
                    className="file-input"
                />
                <div className="drop-zone-content">
                    <span className="upload-icon">{files.length > 0 ? '📑' : '📂'}</span>
                    <p>{files.length > 0 ? `${files.length} Files Selected` : "Select multiple PDFs to merge"}</p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="file-list glass-card">
                    <h4>Queue:</h4>
                    {files.map((f, i) => (
                        <div key={i} className="file-item">
                            <span>{f.name}</span>
                            <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))}>✕</button>
                        </div>
                    ))}
                </div>
            )}

            <button 
                onClick={handleMerge} 
                disabled={files.length < 2 || status === 'processing'} 
                className="btn-primary"
                style={{ marginTop: '1.5rem' }}
            >
                {status === 'processing' ? 'Merging Documents...' : status === 'success' ? 'Ready! 📥' : 'Merge PDFs'}
            </button>
        </div>
    );
}