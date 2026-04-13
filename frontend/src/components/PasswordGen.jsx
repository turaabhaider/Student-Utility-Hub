import { useState } from 'react';

export default function PasswordGen() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({ numbers: true, symbols: true, uppercase: true });
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let retVal = "";
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(retVal);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-inner animate-in">
      <div className="tool-header">
        <h2>🔐 Password Generator</h2>
        <p>Generate military-grade passwords locally in your browser.</p>
      </div>

      <div className="password-result-card glass-card">
        <input 
          type="text" 
          value={password} 
          readOnly 
          placeholder="••••••••••••" 
          className="password-display" 
        />
        <button 
          onClick={copyToClipboard} 
          className={`copy-btn ${copied ? 'copied' : ''}`}
          disabled={!password}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      
      <div className="settings-grid">
        <div className="input-field full-width">
          <div className="label-row">
            <label>Password Length</label>
            <span className="length-badge">{length}</span>
          </div>
          <input 
            type="range" 
            min="8" 
            max="64" 
            value={length} 
            onChange={(e) => setLength(e.target.value)} 
            className="premium-range"
          />
        </div>

        <div className="options-group">
          <label className="checkbox-container">
            <input type="checkbox" checked={options.numbers} onChange={() => setOptions({...options, numbers: !options.numbers})} />
            <span className="checkmark"></span>
            Numbers (0-9)
          </label>
          <label className="checkbox-container">
            <input type="checkbox" checked={options.symbols} onChange={() => setOptions({...options, symbols: !options.symbols})} />
            <span className="checkmark"></span>
            Symbols (!@#$)
          </label>
          <label className="checkbox-container">
            <input type="checkbox" checked={options.uppercase} onChange={() => setOptions({...options, uppercase: !options.uppercase})} />
            <span className="checkmark"></span>
            Uppercase (A-Z)
          </label>
        </div>
      </div>
      
      <button onClick={generate} className="btn-primary">
        Generate Secure Password
      </button>
    </div>
  );
}