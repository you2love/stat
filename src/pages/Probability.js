import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Probability() {
  const [coinFlips, setCoinFlips] = useState(10);
  const [flips, setFlips] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);

  const flipCoin = () => {
    setIsFlipping(true);
    const results = [];
    for (let i = 0; i < coinFlips; i++) {
      results.push(Math.random() < 0.5 ? '正面' : '反面');
    }
    setFlips(results);
    setTimeout(() => setIsFlipping(false), 500);
  };

  const heads = flips.filter(f => f === '正面').length;
  const tails = flips.filter(f => f === '反面').length;
  const headsPercent = flips.length > 0 ? ((heads / flips.length) * 100).toFixed(1) : 0;
  const tailsPercent = flips.length > 0 ? ((tails / flips.length) * 100).toFixed(1) : 0;

  const chartData = {
    labels: flips.map((_, i) => i + 1),
    datasets: [{
      label: '累计正面比例',
      data: flips.map((_, i) => {
        const subFlips = flips.slice(0, i + 1);
        const h = subFlips.filter(f => f === '正面').length;
        return ((h / (i + 1)) * 100).toFixed(1);
      }),
      borderColor: 'rgba(33, 150, 243, 1)',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '大数定律演示：正面比例随试验次数趋近于50%',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: '正面比例 (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: '试验次数'
        }
      }
    }
  };

  return (
    <div className="probability-page">
      <h1 className="page-title">概率论基础</h1>

      <div className="content-card">
        <h2 className="card-title">🎲 什么是概率？</h2>
        <p>
          概率是衡量事件发生可能性的数值，取值范围在 0 到 1 之间。
          0 表示不可能发生，1 表示必然发生。概率论是研究随机现象的数学理论。
        </p>
        <div className="formula-box">
          <BlockMath math="P(A) = \frac{\text{事件A发生的有利结果数}}{\text{所有可能结果的总数}}" />
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">📊 基本概念</h2>

        <h3 className="mt-4 mb-3">1. 条件概率</h3>
        <p>
          条件概率是在已知事件 B 发生的条件下，事件 A 发生的概率。
        </p>
        <div className="formula-box">
          <BlockMath math="P(A|B) = \frac{P(A \cap B)}{P(B)}" />
        </div>
        <p className="text-muted">其中 <InlineMath math="P(A|B)" /> 表示在 B 发生的条件下 A 发生的概率。</p>

        <h3 className="mt-4 mb-3">2. 乘法定理</h3>
        <p>
          两个事件同时发生的概率等于一个事件的概率乘以在该事件发生的条件下另一个事件的概率。
        </p>
        <div className="formula-box">
          <BlockMath math="P(A \cap B) = P(A) \times P(B|A) = P(B) \times P(A|B)" />
        </div>

        <h3 className="mt-4 mb-3">3. 贝叶斯定理</h3>
        <p>
          贝叶斯定理描述了条件概率之间的关系，是统计推断的重要工具。
        </p>
        <div className="formula-box">
          <BlockMath math="P(A|B) = \frac{P(B|A) \times P(A)}{P(B)}" />
        </div>
        <p className="text-muted">
          其中：
        </p>
        <ul>
          <li><InlineMath math="P(A)" /> - 先验概率（在考虑 B 之前 A 的概率）</li>
          <li><InlineMath math="P(B|A)" /> - 似然度（在 A 发生的条件下 B 发生的概率）</li>
          <li><InlineMath math="P(A|B)" /> - 后验概率（在观察到 B 之后 A 的概率）</li>
        </ul>
      </div>

      <div className="content-card">
        <h2 className="card-title">🔄 大数定律演示</h2>
        <p>
          大数定律表明：当独立重复试验的次数趋近于无穷时，事件发生的频率会趋近于其理论概率。
        </p>
        
        <div className="mb-3">
          <label className="form-label">抛硬币次数：</label>
          <input
            type="number"
            className="form-control"
            value={coinFlips}
            onChange={(e) => setCoinFlips(parseInt(e.target.value) || 10)}
            min="1"
            max="1000"
          />
        </div>
        
        <button 
          className="btn btn-custom btn-primary-custom" 
          onClick={flipCoin}
          disabled={isFlipping}
        >
          {isFlipping ? '抛掷中...' : '开始抛硬币'}
        </button>

        {flips.length > 0 && (
          <div className="mt-4">
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="content-card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
                  <h4 className="mb-3">🌞 正面</h4>
                  <h2 style={{ color: 'var(--primary-color)' }}>{heads} 次</h2>
                  <p className="text-muted">{headsPercent}%</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="content-card" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
                  <h4 className="mb-3">🌙 反面</h4>
                  <h2 style={{ color: 'var(--secondary-color)' }}>{tails} 次</h2>
                  <p className="text-muted">{tailsPercent}%</p>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>

            <div className="alert alert-info mt-3">
              <strong>观察：</strong> 随着试验次数增加，正面比例会逐渐趋近于 50%。这就是大数定律的体现！
            </div>
          </div>
        )}
      </div>

      <div className="content-card">
        <h2 className="card-title">📈 常见概率分布</h2>

        <h3 className="mt-4 mb-3">1. 正态分布</h3>
        <p>
          正态分布（也称为高斯分布）是最重要的连续概率分布，许多自然现象都遵循正态分布。
        </p>
        <div className="formula-box">
          <BlockMath math="f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}" />
        </div>
        <p className="text-muted">
          其中 <InlineMath math="\mu" /> 是均值，<InlineMath math="\sigma" /> 是标准差。
        </p>

        <h3 className="mt-4 mb-3">2. 二项分布</h3>
        <p>
          二项分布描述了 n 次独立伯努利试验中成功次数的概率分布。
        </p>
        <div className="formula-box">
          <BlockMath math="P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}" />
        </div>
        <p className="text-muted">
          其中 <InlineMath math="n" /> 是试验次数，<InlineMath math="k" /> 是成功次数，<InlineMath math="p" /> 是每次试验成功的概率。
        </p>
      </div>

      <div className="content-card">
        <h2 className="card-title">💡 贝叶斯定理应用示例</h2>
        <p>
          <strong>医疗检测问题：</strong> 某疾病的发病率为 0.1%，检测方法的准确率为 99%（即患病者检测为阳性的概率为 99%，健康者检测为阴性的概率为 99%）。
          如果一个人的检测结果为阳性，他真正患病的概率是多少？
        </p>
        <div className="formula-box">
          <BlockMath math="P(\text{患病}|\text{阳性}) = \frac{0.99 \times 0.001}{0.99 \times 0.001 + 0.01 \times 0.999} \approx 9\%" />
        </div>
        <p className="text-danger">
          <strong>结论：</strong> 即使检测准确率高达 99%，阳性结果下真正患病的概率只有约 9%！
          这就是为什么需要结合先验概率来判断。
        </p>
      </div>
    </div>
  );
}

export default Probability;