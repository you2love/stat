import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Basics() {
  const [dataInput, setDataInput] = useState('10, 20, 30, 40, 50');
  const [stats, setStats] = useState(null);

  const calculateStats = () => {
    const numbers = dataInput.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (numbers.length === 0) return;

    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    
    const mode = numbers.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});
    const modeValue = Object.entries(mode).sort((a, b) => b[1] - a[1])[0][0];

    const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
    const stdDev = Math.sqrt(variance);

    setStats({
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      mode: modeValue,
      variance: variance.toFixed(2),
      stdDev: stdDev.toFixed(2),
      data: numbers
    });
  };

  const chartData = stats ? {
    labels: stats.data.map((_, i) => `数据${i + 1}`),
    datasets: [{
      label: '数据值',
      data: stats.data,
      backgroundColor: 'rgba(33, 150, 243, 0.6)',
      borderColor: 'rgba(33, 150, 243, 1)',
      borderWidth: 1,
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '数据分布可视化',
      },
    },
  };

  return (
    <div className="basics-page">
      <h1 className="page-title">统计学基础</h1>

      <div className="content-card">
        <h2 className="card-title">📊 什么是统计学？</h2>
        <p>
          统计学是收集、分析、解释和展示数据的科学。它帮助我们理解数据中的模式和趋势，
          做出基于证据的决策。统计学广泛应用于科学研究、商业分析、医疗保健、社会科学等领域。
        </p>
      </div>

      <div className="content-card">
        <h2 className="card-title">📈 描述性统计</h2>
        
        <h3 className="mt-4 mb-3">1. 集中趋势度量</h3>
        
        <div className="mb-4">
          <h4>均值 (Mean)</h4>
          <p>均值是所有数据的总和除以数据的数量。</p>
          <div className="formula-box">
            <BlockMath math="\bar{x} = \frac{\sum_{i=1}^{n} x_i}{n}" />
          </div>
          <p className="text-muted">其中 <InlineMath math="\bar{x}" /> 是均值，<InlineMath math="x_i" /> 是每个数据点，<InlineMath math="n" /> 是数据总数。</p>
        </div>

        <div className="mb-4">
          <h4>中位数 (Median)</h4>
          <p>中位数是将数据按顺序排列后位于中间位置的值。对于偶数个数据，中位数是中间两个数的平均值。</p>
        </div>

        <div className="mb-4">
          <h4>众数 (Mode)</h4>
          <p>众数是数据中出现频率最高的值。</p>
        </div>

        <h3 className="mt-5 mb-3">2. 离散程度度量</h3>

        <div className="mb-4">
          <h4>方差 (Variance)</h4>
          <p>方差衡量数据点与均值的偏离程度。</p>
          <div className="formula-box">
            <BlockMath math="\sigma^2 = \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n}" />
          </div>
        </div>

        <div className="mb-4">
          <h4>标准差 (Standard Deviation)</h4>
          <p>标准差是方差的平方根，与数据具有相同的单位。</p>
          <div className="formula-box">
            <BlockMath math="\sigma = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n}}" />
          </div>
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">🧮 交互式计算器</h2>
        <p>输入一组数据（用逗号分隔），计算各种统计量：</p>
        
        <div className="mb-3">
          <label className="form-label">数据（用逗号分隔）：</label>
          <input
            type="text"
            className="form-control"
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            placeholder="例如：10, 20, 30, 40, 50"
          />
        </div>
        
        <button className="btn btn-custom btn-primary-custom" onClick={calculateStats}>
          计算统计量
        </button>

        {stats && (
          <div className="mt-4">
            <h4 className="mb-3">计算结果：</h4>
            <div className="row">
              <div className="col-md-6">
                <ul className="feature-list">
                  <li>
                    <div className="feature-icon icon-blue">μ</div>
                    <div>
                      <strong>均值：</strong> {stats.mean}
                    </div>
                  </li>
                  <li>
                    <div className="feature-icon icon-pink">M</div>
                    <div>
                      <strong>中位数：</strong> {stats.median}
                    </div>
                  </li>
                  <li>
                    <div className="feature-icon icon-green">Mo</div>
                    <div>
                      <strong>众数：</strong> {stats.mode}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="feature-list">
                  <li>
                    <div className="feature-icon icon-blue">σ²</div>
                    <div>
                      <strong>方差：</strong> {stats.variance}
                    </div>
                  </li>
                  <li>
                    <div className="feature-icon icon-pink">σ</div>
                    <div>
                      <strong>标准差：</strong> {stats.stdDev}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="chart-container mt-4">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>

      <div className="content-card">
        <h2 className="card-title">💡 实际应用</h2>
        <ul className="feature-list">
          <li>
            <div className="feature-icon icon-blue">🏢</div>
            <div>
              <strong>商业分析：</strong> 分析销售数据、客户行为，优化业务决策
            </div>
          </li>
          <li>
            <div className="feature-icon icon-pink">🏥</div>
            <div>
              <strong>医疗研究：</strong> 评估治疗效果、疾病流行趋势
            </div>
          </li>
          <li>
            <div className="feature-icon icon-green">📊</div>
            <div>
              <strong>质量控制：</strong> 监测生产过程中的产品一致性
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Basics;