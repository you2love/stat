import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: '📈',
      title: '描述性统计',
      description: '学习均值、中位数、众数、方差、标准差等核心概念',
      link: '/basics',
      color: 'icon-blue'
    },
    {
      icon: '🎲',
      title: '概率论基础',
      description: '掌握概率分布、贝叶斯定理、条件概率等重要理论',
      link: '/probability',
      color: 'icon-pink'
    },
    {
      icon: '🔍',
      title: '统计推断',
      description: '理解假设检验、置信区间、回归分析等高级方法',
      link: '/inference',
      color: 'icon-green'
    },
    {
      icon: '🎯',
      title: '数据分析流程',
      description: '学习如何从数据中利用统计学找到规律',
      link: '/data-analysis',
      color: 'icon-blue',
      highlight: true
    },
    {
      icon: '👥',
      title: '人口数据分析',
      description: '分析中国人口结构变化、老龄化趋势和城镇化进程',
      link: '/population',
      color: 'icon-purple'
    },
    {
      icon: '🚗',
      title: '交通事故分析',
      description: '通过实际案例学习统计分析方法在交通安全中的应用',
      link: '/traffic-accident-analysis',
      color: 'icon-red'
    }
  ];

  const whyStats = [
    '数据驱动决策的基础',
    '科学研究的重要工具',
    '商业分析的核心技能',
    '人工智能和机器学习的数学基础'
  ];

  return (
    <div className="home-page">
      <div className="hero-section text-center py-5">
        <h1 className="display-4 mb-4" style={{ color: 'var(--dark-bg)' }}>
          欢迎来到统计学学习平台
        </h1>
        <p className="lead mb-4" style={{ color: '#666', maxWidth: '800px', margin: '0 auto 2rem' }}>
          通过交互式课程和可视化示例，轻松掌握统计学的核心概念和方法。
          无论是数据分析、科学研究还是机器学习，统计学都是不可或缺的基础。
        </p>
        <div className="hero-buttons">
          <Link to="/basics" className="btn btn-custom btn-primary-custom me-3">
            开始学习
          </Link>
          <Link to="/probability" className="btn btn-custom btn-secondary-custom">
            探索概率论
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h2 className="text-center mb-4" style={{ color: 'var(--dark-bg)' }}>
            为什么学习统计学？
          </h2>
          <div className="content-card">
            <ul className="feature-list">
              {whyStats.map((item, index) => (
                <li key={index}>
                  <div className="feature-icon icon-green">
                    ✓
                  </div>
                  <span style={{ fontSize: '1.1rem' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-center my-5" style={{ color: 'var(--dark-bg)' }}>
        学习模块
      </h2>

      <div className="row">
        {features.map((feature, index) => (
          <div 
            className={`col-md-4 mb-4 ${feature.highlight ? 'offset-md-4' : ''}`} 
            key={index}
          >
            <div 
              className={`content-card h-100 ${feature.highlight ? '' : ''}`} 
              style={feature.highlight ? { background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(63, 81, 181, 0.1) 100%)' } : {}}
            >
              <div className="feature-icon mb-3" style={{ width: '60px', height: '60px', fontSize: '2rem' }}>
                {feature.icon}
              </div>
              <h3 className="card-title">{feature.title}</h3>
              <p className="text-muted mb-4">{feature.description}</p>
              <Link to={feature.link} className="btn btn-custom btn-primary-custom">
                开始学习 →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="content-card mt-5" style={{ background: 'linear-gradient(135deg, var(--dark-bg) 0%, #3f51b5 100%)', color: 'white' }}>
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2 className="mb-3">准备开始你的统计学之旅？</h2>
            <p className="mb-0">
              通过循序渐进的课程和交互式练习，从零开始掌握统计学知识。
              每个模块都包含理论讲解、实例演示和练习题目。
            </p>
          </div>
          <div className="col-md-4 text-center">
            <Link to="/basics" className="btn btn-light btn-custom" style={{ color: 'var(--dark-bg)' }}>
              立即开始
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;