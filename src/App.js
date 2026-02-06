import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Basics from './pages/Basics';
import Probability from './pages/Probability';
import Inference from './pages/Inference';
import DataAnalysis from './pages/DataAnalysis';
import Population from './pages/Population';
import TrafficAccidentAnalysis from './pages/TrafficAccidentAnalysis';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basics" element={<Basics />} />
            <Route path="/probability" element={<Probability />} />
            <Route path="/inference" element={<Inference />} />
            <Route path="/data-analysis" element={<DataAnalysis />} />
            <Route path="/population" element={<Population />} />
            <Route path="/traffic-accident-analysis" element={<TrafficAccidentAnalysis />} />
          </Routes>
        </div>
        <footer className="footer">
          <p>© 2026 统计学学习平台 | 通过交互式学习掌握统计学</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;