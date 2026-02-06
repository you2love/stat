import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/basics', label: '统计学基础' },
    { path: '/probability', label: '概率论' },
    { path: '/inference', label: '统计推断' },
    { path: '/data-analysis', label: '数据分析流程' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          📊 统计学学习平台
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;