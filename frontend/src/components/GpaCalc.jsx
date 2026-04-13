import { useState } from 'react';

export default function GpaCalc() {
  const [subjects, setSubjects] = useState([{ name: '', grade: '', credits: '' }]);

  const addSubject = () => setSubjects([...subjects, { name: '', grade: '', credits: '' }]);
  
  const removeSubject = (index) => {
    if (subjects.length > 1) {
      const newSubjects = subjects.filter((_, i) => i !== index);
      setSubjects(newSubjects);
    }
  };

  const updateSubject = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    subjects.forEach(sub => {
      if(sub.grade && sub.credits) {
        totalPoints += parseFloat(sub.grade) * parseFloat(sub.credits);
        totalCredits += parseFloat(sub.credits);
      }
    });
    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  };

  return (
    <div className="tool-inner animate-in">
      <div className="tool-header">
        <h2>📊 GPA Calculator</h2>
        <p>Enter your subjects and credits to see your live GPA calculation.</p>
      </div>

      <div className="gpa-card">
        <span className="gpa-label">Estimated GPA</span>
        <h1 className="gpa-value">{calculateGPA()}</h1>
      </div>

      <div className="subject-container">
        {subjects.map((sub, index) => (
          <div key={index} className="subject-row">
            <input 
              className="main-input sub-name" 
              placeholder="Subject (e.g. Physics)" 
              value={sub.name} 
              onChange={(e) => updateSubject(index, 'name', e.target.value)} 
            />
            <select 
              className="main-input sub-grade" 
              value={sub.grade} 
              onChange={(e) => updateSubject(index, 'grade', e.target.value)}
            >
              <option value="">Grade</option>
              <option value="4.0">A (4.0)</option>
              <option value="3.5">B+ (3.5)</option>
              <option value="3.0">B (3.0)</option>
              <option value="2.5">C+ (2.5)</option>
              <option value="2.0">C (2.0)</option>
              <option value="1.0">D (1.0)</option>
              <option value="0.0">F (0.0)</option>
            </select>
            <input 
              className="main-input sub-credits" 
              type="number" 
              placeholder="Credits" 
              value={sub.credits} 
              onChange={(e) => updateSubject(index, 'credits', e.target.value)} 
            />
            <button className="del-btn" onClick={() => removeSubject(index)}>🗑️</button>
          </div>
        ))}
      </div>

      <div className="tool-actions">
        <button onClick={addSubject} className="btn-secondary">+ Add Subject</button>
      </div>
    </div>
  );
}