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
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Inference() {
  const [sampleMean, setSampleMean] = useState('');
  const [sampleStd, setSampleStd] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('95');
  const [result, setResult] = useState(null);

  const calculateCI = () => {
    const mean = parseFloat(sampleMean);
    const std = parseFloat(sampleStd);
    const n = parseFloat(sampleSize);
    const cl = parseFloat(confidenceLevel);

    if (isNaN(mean) || isNaN(std) || isNaN(n) || isNaN(cl) || n <= 0) {
      alert('请输入有效的数值');
      return;
    }

    // Z值（大样本情况）
    const zValues = { 90: 1.645, 95: 1.96, 99: 2.576 };
    const z = zValues[cl] || 1.96;

    const marginError = z * (std / Math.sqrt(n));
    const lowerBound = mean - marginError;
    const upperBound = mean + marginError;

    setResult({
      mean: mean.toFixed(4),
      std: std.toFixed(4),
      n: n,
      cl: cl,
      marginError: marginError.toFixed(4),
      lowerBound: lowerBound.toFixed(4),
      upperBound: upperBound.toFixed(4),
      z: z
    });
  };

  const chartData = result ? {
    labels: Array.from({ length: 100 }, (_, i) => (result.lowerBound + (result.upperBound - result.lowerBound) * i / 99).toFixed(2)),
    datasets: [{
      label: '正态分布',
      data: Array.from({ length: 100 }, (_, i) => {
        const x = result.lowerBound + (result.upperBound - result.lowerBound) * i / 99;
        const mean = parseFloat(result.mean);
        const std = parseFloat(result.std) / Math.sqrt(result.n);
        return Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
      }),
      borderColor: 'rgba(33, 150, 243, 1)',
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `置信区间可视化 (${result?.cl}% 置信水平)`,
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: parseFloat(result?.lowerBound),
            xMax: parseFloat(result?.lowerBound),
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          },
          line2: {
            type: 'line',
            xMin: parseFloat(result?.upperBound),
            xMax: parseFloat(result?.upperBound),
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          }
        }
      }
    },
    scales: {
      y: {
        display: false
      }
    }
  };

  return (
    <div className="inference-page">
      <h1 className="page-title">统计推断</h1>

      <div className="content-card">
        <h2 className="card-title">🔍 什么是统计推断？</h2>
        <p>
          统计推断是根据样本数据对总体特征进行推断的过程。它包括参数估计和假设检验两大类方法。
          统计推断是统计学最重要的应用领域之一，帮助我们根据有限的样本信息做出关于总体的结论。
        </p>
      </div>

      <div className="content-card">
        <h2 className="card-title">📊 参数估计</h2>

        <h3 className="mt-4 mb-3">1. 点估计</h3>
        <p>
          点估计是用样本统计量的一个具体数值作为总体参数的估计值。
        </p>
        <ul>
          <li><strong>样本均值</strong> 估计总体均值 <InlineMath math="\mu" /></li>
          <li><strong>样本方差</strong> 估计总体方差 <InlineMath math="\sigma^2" /></li>
        </ul>

        <h3 className="mt-4 mb-3">2. 区间估计（置信区间）</h3>
        <p>
          置信区间是参数的一个可能取值范围，该范围以一定的概率（置信水平）包含真实的参数值。
        </p>
        
        <h4 className="mt-3 mb-2">总体均值的置信区间</h4>
        <p>对于大样本（<InlineMath math="n \geq 30" />），使用正态分布：</p>
        <div className="formula-box">
          <BlockMath math="\bar{x} \pm z_{\alpha/2} \cdot \frac{s}{\sqrt{n}}" />
        </div>
        <p className="text-muted">
          其中：
        </p>
        <ul>
          <li><InlineMath math="\bar{x}" /> - 样本均值</li>
          <li><InlineMath math="z_{\alpha/2}" /> - 标准正态分布的临界值</li>
          <li><InlineMath math="s" /> - 样本标准差</li>
          <li><InlineMath math="n" /> - 样本容量</li>
        </ul>

        <p className="mt-3">对于小样本（<InlineMath math="n < 30" />），使用 t 分布：</p>
        <div className="formula-box">
          <BlockMath math="\bar{x} \pm t_{\alpha/2, n-1} \cdot \frac{s}{\sqrt{n}}" />
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">🧮 置信区间计算器</h2>
        <p>输入样本统计量，计算总体均值的置信区间：</p>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">样本均值：</label>
            <input
              type="number"
              step="any"
              className="form-control"
              value={sampleMean}
              onChange={(e) => setSampleMean(e.target.value)}
              placeholder="例如：50"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">样本标准差：</label>
            <input
              type="number"
              step="any"
              className="form-control"
              value={sampleStd}
              onChange={(e) => setSampleStd(e.target.value)}
              placeholder="例如：5"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">样本容量：</label>
            <input
              type="number"
              className="form-control"
              value={sampleSize}
              onChange={(e) => setSampleSize(e.target.value)}
              placeholder="例如：100"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">置信水平：</label>
            <select 
              className="form-select"
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(e.target.value)}
            >
              <option value="90">90%</option>
              <option value="95">95%</option>
              <option value="99">99%</option>
            </select>
          </div>
        </div>
        
        <button className="btn btn-custom btn-primary-custom" onClick={calculateCI}>
          计算置信区间
        </button>

        {result && (
          <div className="mt-4">
            <h4 className="mb-3">计算结果：</h4>
            <div className="content-card" style={{ background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(63, 81, 181, 0.1) 100%)' }}>
              <h3 className="text-center mb-3">
                {result.lowerBound} <span style={{ color: 'var(--primary-color)' }}>≤</span> μ <span style={{ color: 'var(--primary-color)' }}>≤</span> {result.upperBound}
              </h3>
              <p className="text-center text-muted">
                我们有 {result.cl}% 的把握认为总体均值在 [{result.lowerBound}, {result.upperBound}] 之间
              </p>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <ul className="feature-list">
                  <li>
                    <div className="feature-icon icon-blue">x̄</div>
                    <div>
                      <strong>样本均值：</strong> {result.mean}
                    </div>
                  </li>
                  <li>
                    <div className="feature-icon icon-pink">s</div>
                    <div>
                      <strong>样本标准差：</strong> {result.std}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="feature-list">
                  <li>
                    <div className="feature-icon icon-green">n</div>
                    <div>
                      <strong>样本容量：</strong> {result.n}
                    </div>
                  </li>
                  <li>
                    <div className="feature-icon icon-blue">E</div>
                    <div>
                      <strong>边际误差：</strong> {result.marginError}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="chart-container mt-4">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>

      <div className="content-card">
        <h2 className="card-title">✅ 假设检验</h2>

        <h3 className="mt-4 mb-3">基本概念</h3>
        <p>
          假设检验是根据样本数据对关于总体参数的假设进行检验的方法。
        </p>

        <h4 className="mt-3 mb-2">假设的类型：</h4>
        <ul>
          <li><strong>原假设 (<InlineMath math="H_0" />)</strong>：通常表示"没有差异"或"没有效果"</li>
          <li><strong>备择假设 (<InlineMath math="H_1" />)</strong>：通常表示"有差异"或"有效果"</li>
        </ul>

        <h4 className="mt-3 mb-2">检验步骤：</h4>
        <ol>
          <li>建立原假设和备择假设</li>
          <li>选择适当的检验统计量</li>
          <li>确定显著性水平（通常为 0.05）</li>
          <li>计算检验统计量的值</li>
          <li>做出决策：拒绝或不拒绝原假设</li>
        </ol>

        <h3 className="mt-4 mb-3">常见的检验类型：</h3>

        <div className="mb-3">
          <h4>1. z 检验</h4>
          <p>当总体标准差已知或样本容量较大时使用。</p>
          <div className="formula-box">
            <BlockMath math="z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}" />
          </div>
        </div>

        <div className="mb-3">
          <h4>2. t 检验</h4>
          <p>当总体标准差未知且样本容量较小时使用。</p>
          <div className="formula-box">
            <BlockMath math="t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}" />
          </div>
        </div>

        <div className="mb-3">
          <h4>3. 卡方检验</h4>
          <p>用于检验分类变量之间的独立性或拟合优度。</p>
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">💡 假设检验示例</h2>
        <p>
          <strong>问题：</strong> 某工厂声称其生产的灯泡平均寿命为 1000 小时。
          从生产线上随机抽取 36 个灯泡，测得平均寿命为 990 小时，标准差为 50 小时。
          在 5% 的显著性水平下，能否支持工厂的声称？
        </p>

        <h4 className="mt-3 mb-2">解答步骤：</h4>
        <ol>
          <li>
            <strong>建立假设：</strong><br />
            <InlineMath math="H_0: \mu = 1000" />（灯泡平均寿命为 1000 小时）<br />
            <InlineMath math="H_1: \mu \neq 1000" />（灯泡平均寿命不为 1000 小时）
          </li>
          <li>
            <strong>选择检验统计量：</strong><br />
            使用 t 检验（总体标准差未知）
          </li>
          <li>
            <strong>计算 t 值：</strong><br />
            <InlineMath math="t = \frac{990 - 1000}{50 / \sqrt{36}} = \frac{-10}{8.33} = -1.2" />
          </li>
          <li>
            <strong>临界值：</strong><br />
            在 <InlineMath math="\alpha = 0.05" />，自由度为 35 时，<InlineMath math="t_{0.025, 35} \approx 2.03" />
          </li>
          <li>
            <strong>决策：</strong><br />
            由于 <InlineMath math="|t| = 1.2 < 2.03" />，不拒绝原假设
          </li>
        </ol>

        <div className="alert alert-success mt-3">
          <strong>结论：</strong> 在 5% 的显著性水平下，样本数据支持工厂的声称，
          可以认为灯泡的平均寿命为 1000 小时。
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">🎯 重要概念</h2>

        <h3 className="mt-4 mb-3">第一类错误和第二类错误</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th><InlineMath math="H_0" /> 为真</th>
              <th><InlineMath math="H_0" /> 为假</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>拒绝 <InlineMath math="H_0" /></strong></td>
              <td className="table-danger">第一类错误（假阳性）<br /><InlineMath math="P = \alpha" /></td>
              <td className="table-success">正确决策<br /><InlineMath math="P = 1 - \beta" /></td>
            </tr>
            <tr>
              <td><strong>不拒绝 <InlineMath math="H_0" /></strong></td>
              <td className="table-success">正确决策<br /><InlineMath math="P = 1 - \alpha" /></td>
              <td className="table-danger">第二类错误（假阴性）<br /><InlineMath math="P = \beta" /></td>
            </tr>
          </tbody>
        </table>

        <ul className="mt-3">
          <li><strong>第一类错误（<InlineMath math="\alpha" />）</strong>：原假设为真时拒绝原假设的概率</li>
          <li><strong>第二类错误（<InlineMath math="\beta" />）</strong>：原假设为假时不拒绝原假设的概率</li>
          <li><strong>检验功效（<InlineMath math="1-\beta" />）</strong>：正确拒绝错误原假设的概率</li>
        </ul>
      </div>
    </div>
  );
}

export default Inference;