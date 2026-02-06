import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

function TrafficAccidentAnalysis() {
  return (
    <div className="traffic-accident-page">
      <h1 className="page-title">🚗 交通事故数据分析</h1>

      <div className="content-card">
        <h2 className="card-title">📊 案例背景</h2>
        <p>
          道路交通事故是影响公共安全的重要问题。通过分析交通事故数据，我们可以：
        </p>
        <ul>
          <li>识别事故高发时段和地点</li>
          <li>分析事故原因和影响因素</li>
          <li>评估交通安全措施的效果</li>
          <li>为政策制定提供数据支持</li>
        </ul>
        <p className="text-muted">
          <strong>数据来源：</strong>模拟数据（基于国内交通事故统计特征）
          <br>
          <strong>数据范围：</strong>2018-2023年全国交通事故数据
        </p>
      </div>

      <div className="content-card" style={{ background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(233, 30, 99, 0.1) 100%)' }}>
        <h2 className="card-title">📋 数据集说明</h2>

        <h3 className="mt-4 mb-3">变量说明</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>变量名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>年份</td>
              <td>数值型</td>
              <td>事故发生的年份</td>
            </tr>
            <tr>
              <td>月份</td>
              <td>数值型</td>
              <td>事故发生的月份（1-12）</td>
            </tr>
            <tr>
              <td>地区</td>
              <td>分类变量</td>
              <td>事故发生地区（东/中/西部）</td>
            </tr>
            <tr>
              <td>天气</td>
              <td>分类变量</td>
              <td>天气状况（晴/雨/雪/雾）</td>
            </tr>
            <tr>
              <td>道路类型</td>
              <td>分类变量</td>
              <td>道路类型（高速/国道/省道/城市道路/乡村道路）</td>
            </tr>
            <tr>
              <td>事故原因</td>
              <td>分类变量</td>
              <td>主要原因（超速/酒驾/疲劳驾驶/违规变道/其他）</td>
            </tr>
            <tr>
              <td>伤亡人数</td>
              <td>数值型</td>
              <td>事故造成的伤亡人数</td>
            </tr>
            <tr>
              <td>财产损失（万元）</td>
              <td>数值型</td>
              <td>事故造成的财产损失</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="content-card">
        <h2 className="card-title">🔍 探索性数据分析</h2>

        <h3 className="mt-4 mb-3">时间趋势分析</h3>
        
        <h4 className="mt-3 mb-2">年际变化趋势</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>年份</th>
              <th>事故次数</th>
              <th>伤亡人数</th>
              <th>财产损失（万元）</th>
              <th>年均变化率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2018</td>
              <td>24,518</td>
              <td>31,243</td>
              <td>125,430</td>
              <td>-</td>
            </tr>
            <tr>
              <td>2019</td>
              <td>23,856</td>
              <td>30,128</td>
              <td>118,234</td>
              <td>-2.70%</td>
            </tr>
            <tr>
              <td>2020</td>
              <td>21,567</td>
              <td>27,890</td>
              <td>109,876</td>
              <td>-9.59%</td>
            </tr>
            <tr>
              <td>2021</td>
              <td>20,987</td>
              <td>26,543</td>
              <td>104,532</td>
              <td>-2.69%</td>
            </tr>
            <tr>
              <td>2022</td>
              <td>19,234</td>
              <td>24,678</td>
              <td>96,543</td>
              <td>-8.35%</td>
            </tr>
            <tr>
              <td>2023</td>
              <td>18,765</td>
              <td>23,456</td>
              <td>91,234</td>
              <td>-2.44%</td>
            </tr>
          </tbody>
        </table>

        <div className="alert alert-success mt-3">
          <strong>📈 趋势解读：</strong> 交通事故次数和伤亡人数呈逐年下降趋势，年均下降约5-6%，表明交通安全治理成效显著。
        </div>

        <h4 className="mt-4 mb-2">季节性特征</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>季节</th>
              <th>平均事故次数</th>
              <th>占比</th>
              <th>特征</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>春季（3-5月）</td>
              <td>4,892</td>
              <td>20.5%</td>
              <td>天气较好，出行增加</td>
            </tr>
            <tr>
              <td>夏季（6-8月）</td>
              <td>5,234</td>
              <td>21.9%</td>
              <td>高温天气，疲劳驾驶增多</td>
            </tr>
            <tr>
              <td>秋季（9-11月）</td>
              <td>6,567</td>
              <td>27.5%</td>
              <td>节假日集中，事故高发</td>
            </tr>
            <tr>
              <td>冬季（12-2月）</td>
              <td>7,156</td>
              <td>30.1%</td>
              <td>恶劣天气，路面湿滑</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-3">地区分布分析</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>地区</th>
              <th>事故次数</th>
              <th>占比</th>
              <th>主要特征</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>东部地区</td>
              <td>8,234</td>
              <td>34.5%</td>
              <td>经济发达，车流量大</td>
            </tr>
            <tr>
              <td>中部地区</td>
              <td>6,789</td>
              <td>28.4%</td>
              <td>交通枢纽，过境车辆多</td>
            </tr>
            <tr>
              <td>西部地区</td>
              <td>8,832</td>
              <td>37.1%</td>
              <td>地形复杂，路况较差</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-3">天气因素分析</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>天气</th>
              <th>事故次数</th>
              <th>占比</th>
              <th>平均伤亡人数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>晴天</td>
              <td>15,678</td>
              <td>65.7%</td>
              <td>1.25</td>
            </tr>
            <tr>
              <td>雨天</td>
              <td>5,234</td>
              <td>21.9%</td>
              <td>1.68</td>
            </tr>
            <tr>
              <td>雪天</td>
              <td>1,567</td>
              <td>6.6%</td>
              <td>2.12</td>
            </tr>
            <tr>
              <td>雾天</td>
              <td>1,376</td>
              <td>5.8%</td>
              <td>2.34</td>
            </tr>
          </tbody>
        </table>

        <div className="alert alert-warning mt-3">
          <strong>⚠️ 关键发现：</strong> 恶劣天气下的事故占比虽然不高，但平均伤亡人数更高，事故严重程度更大。
        </div>

        <h3 className="mt-5 mb-3">道路类型分析</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>道路类型</th>
              <th>事故次数</th>
              <th>占比</th>
              <th>平均财产损失（万元）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>高速公路</td>
              <td>3,456</td>
              <td>14.5%</td>
              <td>8.56</td>
            </tr>
            <tr>
              <td>国道</td>
              <td>5,678</td>
              <td>23.8%</td>
              <td>4.23</td>
            </tr>
            <tr>
              <td>省道</td>
              <td>4,234</td>
              <td>17.7%</td>
              <td>3.12</td>
            </tr>
            <tr>
              <td>城市道路</td>
              <td>7,567</td>
              <td>31.7%</td>
              <td>2.34</td>
            </tr>
            <tr>
              <td>乡村道路</td>
              <td>2,950</td>
              <td>12.3%</td>
              <td>1.89</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-3">事故原因分析</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>事故原因</th>
              <th>事故次数</th>
              <th>占比</th>
              <th>平均伤亡人数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>超速驾驶</td>
              <td>7,234</td>
              <td>30.3%</td>
              <td>1.45</td>
            </tr>
            <tr>
              <td>疲劳驾驶</td>
              <td>5,123</td>
              <td>21.5%</td>
              <td>1.67</td>
            </tr>
            <tr>
              <td>违规变道</td>
              <td>4,567</td>
              <td>19.1%</td>
              <td>1.23</td>
            </tr>
            <tr>
              <td>酒驾醉驾</td>
              <td>3,234</td>
              <td>13.6%</td>
              <td>2.34</td>
            </tr>
            <tr>
              <td>其他原因</td>
              <td>3,607</td>
              <td>15.5%</td>
              <td>1.12</td>
            </tr>
          </tbody>
        </table>

        <div className="alert alert-danger mt-3">
          <strong>🚨 主要风险：</strong> 超速驾驶是事故的主要原因，占30.3%，需要重点治理。
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">📊 统计建模分析</h2>

        <h3 className="mt-4 mb-3">相关性分析</h3>
        <p>分析各因素与事故严重程度的相关性：</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>因素</th>
              <th>与伤亡人数相关系数</th>
              <th>与财产损失相关系数</th>
              <th>显著性</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>天气恶劣程度</td>
              <td>0.68</td>
              <td>0.52</td>
              <td>p < 0.001</td>
            </tr>
            <tr>
              <td>道路等级</td>
              <td>0.45</td>
              <td>0.71</td>
              <td>p < 0.001</td>
            </tr>
            <tr>
              <td>超速程度</td>
              <td>0.58</td>
              <td>0.63</td>
              <td>p < 0.001</td>
            </tr>
            <tr>
              <td>酒精含量</td>
              <td>0.72</td>
              <td>0.48</td>
              <td>p < 0.001</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-3">回归分析</h3>
        <p>建立伤亡人数的预测模型：</p>
        <div className="formula-box">
          <BlockMath math="Y = \beta_0 + \beta_1X_1 + \beta_2X_2 + \beta_3X_3 + \beta_4X_4 + \varepsilon" />
        </div>
        <p>其中：</p>
        <ul>
          <li><strong>Y：</strong>伤亡人数</li>
          <li><strong>X₁：</strong>天气恶劣程度（1-4）</li>
          <li><strong>X₂：</strong>道路等级（1-5）</li>
          <li><strong>X₃：</strong>超速程度（1-5）</li>
          <li><strong>X₄：</strong>酒精含量（0-1）</li>
        </ul>

        <h4 className="mt-3 mb-2">模型结果</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>变量</th>
              <th>系数</th>
              <th>标准误</th>
              <th>t值</th>
              <th>p值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>截距</td>
              <td>0.23</td>
              <td>0.08</td>
              <td>2.88</td>
              <td>0.004</td>
            </tr>
            <tr>
              <td>天气恶劣程度</td>
              <td>0.32</td>
              <td>0.05</td>
              <td>6.40</td>
              <td>< 0.001</td>
            </tr>
            <tr>
              <td>道路等级</td>
              <td>0.18</td>
              <td>0.04</td>
              <td>4.50</td>
              <td>< 0.001</td>
            </tr>
            <tr>
              <td>超速程度</td>
              <td>0.25</td>
              <td>0.05</td>
              <td>5.00</td>
              <td>< 0.001</td>
            </tr>
            <tr>
              <td>酒精含量</td>
              <td>0.45</td>
              <td>0.06</td>
              <td>7.50</td>
              <td>< 0.001</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3"><strong>模型拟合度：</strong> R² = 0.67，调整后 R² = 0.66</p>

        <div className="alert alert-info mt-3">
          <strong>📊 模型解读：</strong> 
          <ul>
            <li>酒精含量对伤亡人数影响最大（系数0.45）</li>
            <li>天气恶劣程度是第二重要因素（系数0.32）</li>
            <li>所有变量均具有统计显著性（p < 0.01）</li>
          </ul>
        </div>

        <h3 className="mt-5 mb-3">卡方检验</h3>
        <p>检验事故原因与天气状况的关联性：</p>
        <div className="formula-box">
          <BlockMath math="\chi^2 = \sum\frac{(O_{ij} - E_{ij})^2}{E_{ij}}" />
        </div>
        
        <h4 className="mt-3 mb-2">检验结果</h4>
        <ul>
          <li><strong>卡方值：</strong> χ² = 156.78</li>
          <li><strong>自由度：</strong> df = 12</li>
          <li><strong>p值：</strong> p < 0.001</li>
        </ul>

        <div className="alert alert-info mt-3">
          <strong>🔬 结论：</strong> 事故原因与天气状况存在显著关联，恶劣天气下酒驾和超速导致的事故比例更高。
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">💡 政策建议</h2>

        <h3 className="mt-4 mb-3">基于数据分析的建议</h3>

        <h4 className="mt-3 mb-2">1. 加强恶劣天气预警</h4>
        <ul>
          <li>建立实时天气监测系统</li>
          <li>恶劣天气启动应急响应机制</li>
          <li>增加路面巡逻和交通疏导</li>
        </ul>

        <h4 className="mt-3 mb-2">2. 重点治理超速驾驶</h4>
        <ul>
          <li>在事故高发路段增设测速设备</li>
          <li>加大超速处罚力度</li>
          <li>开展超速危害宣传教育</li>
        </ul>

        <h4 className="mt-3 mb-2">3. 严查酒驾醉驾</h4>
        <ul>
          <li>在重点时段和路段设卡检查</li>
          <li>提高酒驾违法成本</li>
          <li>推广代驾服务</li>
        </ul>

        <h4 className="mt-3 mb-2">4. 改善道路安全设施</h4>
        <ul>
          <li>在西部复杂路况路段增设防护设施</li>
          <li>完善道路标识标线</li>
          <li>提升道路照明条件</li>
        </ul>

        <h4 className="mt-3 mb-2">5. 针对性季节管控</h4>
        <ul>
          <li>冬季：重点防范冰雪路面事故</li>
          <li>秋季：加强节假日交通疏导</li>
          <li>夏季：防范疲劳驾驶</li>
        </ul>
      </div>

      <div className="content-card">
        <h2 className="card-title">🎓 统计学方法总结</h2>

        <h3 className="mt-4 mb-3">本案例使用的统计方法</h3>
        <div className="row">
          <div className="col-md-6 mb-3">
            <h4>描述性统计</h4>
            <ul>
              <li>集中趋势：均值、中位数</li>
              <li>离散程度：方差、标准差</li>
              <li>频率分布：各类别占比</li>
            </ul>
          </div>
          <div className="col-md-6 mb-3">
            <h4>相关性分析</h4>
            <ul>
              <li>皮尔逊相关系数</li>
              <li>变量关系识别</li>
              <li>显著性检验</li>
            </ul>
          </div>
          <div className="col-md-6 mb-3">
            <h4>回归分析</h4>
            <ul>
              <li>多元线性回归</li>
              <li>参数估计</li>
              <li>模型评估（R²）</li>
            </ul>
          </div>
          <div className="col-md-6 mb-3">
            <h4>假设检验</h4>
            <ul>
              <li>卡方检验</li>
              <li>独立性检验</li>
              <li>p值判断</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">📚 学习要点</h2>
        <p>通过本案例分析，你应该掌握：</p>
        <ul>
          <li><strong>数据处理：</strong> 如何处理分类变量和时间序列数据</li>
          <li><strong>探索分析：</strong> 通过描述性统计和可视化理解数据</li>
          <li><strong>统计建模：</strong> 建立回归模型预测结果</li>
          <li><strong>假设检验：</strong> 验证变量间的关联性</li>
          <li><strong>结果解释：</strong> 将统计结果转化为可行动的建议</li>
        </ul>
      </div>
    </div>
  );
}

export default TrafficAccidentAnalysis;