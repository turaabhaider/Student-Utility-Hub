import { useState, useEffect } from 'react'
import PasswordGen from './components/PasswordGen'
import GpaCalc from './components/GpaCalc'
import ImageStudio from './components/ImageStudio' // FIX: Point to components, not controllers
import PdfMaster from './components/PdfMaster'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [activeTool, setActiveTool] = useState(null)

  useEffect(() => {
    document.body.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  }, [theme])

  const tools = [
    { id: 'password', icon: '🔐', title: 'Password Gen', desc: 'Military-grade encryption patterns.' },
    { id: 'gpa', icon: '📊', title: 'GPA Calculator', desc: 'Real-time academic tracking.' },
    { id: 'image', icon: '🖼️', title: 'Image Studio', desc: 'Convert JPG, PNG, WEBP instantly.' },
    { id: 'pdf', icon: '📄', title: 'PDF Master', desc: 'Merge, Split, and Compress files.' }
  ]

  const renderTool = () => {
    switch(activeTool) {
      case 'password': return <PasswordGen />;
      case 'image': return <ImageStudio />;
      case 'pdf': return <PdfMaster />;
      case 'gpa': return <GpaCalc />;
      default: return <div className="tool-inner"><h2>Coming Soon</h2><p>We are finalizing this tool for you.</p></div>;
    }
  }

  return (
    <>
      <div className="bg-animation"></div>
      
      <header className="glass-nav">
        <div className="logo">🛠️ Student<span>Utility</span>Hub</div>
        <div className="nav-right">
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="btn-icon">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <a href="https://github.com" className="btn-small">GitHub</a>
        </div>
      </header>

      <main className="container">
        {!activeTool ? (
          <>
            {/* NEW HERO SECTION */}
            <section className="hero-section">
              <span className="badge">v1.0 is now live 🚀</span>
              <h1>The Ultimate Digital <br/><span>Academic Toolkit</span></h1>
              <p>Everything a student needs to stay productive, secure, and organized. <br/> No ads. No tracking. Just pure utility.</p>
              <div className="hero-stats">
                <div className="stat"><span>4+</span><p>Tools</p></div>
                <div className="stat"><span>100%</span><p>Secure</p></div>
                <div className="stat"><span>0ms</span><p>Latency</p></div>
              </div>
            </section>

            {/* TOOLS GRID */}
            <section className="tools-grid">
              {tools.map(tool => (
                <div key={tool.id} className="glass-card tool-card" onClick={() => setActiveTool(tool.id)}>
                  <div className="card-glow"></div>
                  <div className="card-icon">{tool.icon}</div>
                  <h3>{tool.title}</h3>
                  <p>{tool.desc}</p>
                  <span className="launch-text">Launch Tool →</span>
                </div>
              ))}
            </section>

            {/* INFO SECTION */}
            <section className="info-section">
              <div className="glass-card info-box">
                <h4>Why use our Hub?</h4>
                <ul>
                  <li>✅ <strong>Privacy First:</strong> Files are processed in memory and never saved.</li>
                  <li>✅ <strong>Pure Vanilla:</strong> Built for speed with no bulky frameworks.</li>
                  <li>✅ <strong>Accessible:</strong> Optimized for screen readers and mobile use.</li>
                </ul>
              </div>
            </section>
          </>
        ) : (
          <section className="workspace glass-card animate-in">
            <button className="close-btn" onClick={() => setActiveTool(null)}>← Exit to Dashboard</button>
            {renderTool()}
          </section>
        )}
      </main>

      <footer className="main-footer">
  <div className="container footer-content">
    <div className="footer-brand">
      <div className="logo">🛠️ Student<span>Utility</span>Hub</div>
      <p>Empowering students with privacy-first digital tools. Fast, secure, and always free.</p>
    </div>
    
    <div className="footer-links">
      <div className="link-group">
        <h4>Tools</h4>
        <a onClick={() => setActiveTool('password')}>Password Gen</a>
        <a onClick={() => setActiveTool('gpa')}>GPA Calculator</a>
        <a onClick={() => setActiveTool('image')}>Image Studio</a>
      </div>
      <div className="link-group">
        <h4>Support</h4>
        <a href="#">Documentation</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </div>
      <div className="link-group">
        <h4>Community</h4>
        <a href="#">GitHub</a>
        <a href="#">Discord</a>
        <a href="#">Twitter</a>
      </div>
    </div>
  </div>
  
  <div className="footer-bottom">
    <div className="container">
      <p>© 2026 Student Utility Hub. Designed with ❤️ for students worldwide.</p>
      <div className="status-indicator">
        <span className="dot"></span> All Systems Operational
      </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default App