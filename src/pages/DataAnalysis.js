import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

function DataAnalysis() {
  return (
    <div className="data-analysis-page">
      <h1 className="page-title">数据分析流程</h1>

      <div className="content-card">
        <h2 className="card-title">🎯 如何从数据中利用统计学找到规律？</h2>
        <p>
          从数据中发现规律是一个系统性的过程，需要按照科学的方法进行。
          统计学为我们提供了一套完整的工具和方法，帮助我们从杂乱的数据中提取有意义的模式和洞察。
        </p>
      </div>

      <div className="content-card" style={{ background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(63, 81, 181, 0.1) 100%)' }}>
        <h2 className="card-title">📊 统计学分析完整工作流程</h2>
        <div className="row text-center">
          <div className="col-md-3 mb-3">
            <div className="step-number">1</div>
            <h4>问题定义</h4>
            <p className="text-muted">明确分析目标</p>
          </div>
          <div className="col-md-3 mb-3">
            <div className="step-number">2</div>
            <h4>数据收集</h4>
            <p className="text-muted">获取可靠数据</p>
          </div>
          <div className="col-md-3 mb-3">
            <div className="step-number">3</div>
            <h4>探索分析</h4>
            <p className="text-muted">理解数据特征</p>
          </div>
          <div className="col-md-3 mb-3">
            <div className="step-number">4</div>
            <h4>统计建模</h4>
            <p className="text-muted">发现规律模式</p>
          </div>
          <div className="col-md-3 mb-3 offset-md-0 mt-md-3">
            <div className="step-number">5</div>
            <h4>验证评估</h4>
            <p className="text-muted">检验模型效果</p>
          </div>
          <div className="col-md-3 mb-3 offset-md-0 mt-md-3">
            <div className="step-number">6</div>
            <h4>解释结论</h4>
            <p className="text-muted">转化为决策</p>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">🔍 步骤详解</h2>

        <h3 className="mt-4 mb-3">步骤 1：问题定义</h3>
        <p>在开始任何数据分析之前，首先要明确我们要解决的问题：</p>
        <ul>
          <li><strong>研究目标：</strong> 我们想了解什么？</li>
          <li><strong>研究假设：</strong> 我们期望发现什么规律？</li>
          <li><strong>数据需求：</strong> 需要什么样的数据来回答问题？</li>
          <li><strong>分析方法：</strong> 选择合适的统计方法</li>
        </ul>
        <div className="alert alert-info mt-3">
          <strong>💡 关键：</strong> 一个清晰明确的问题是成功数据分析的基础。问题越具体，分析越有针对性。
        </div>

        <h3 className="mt-5 mb-3">步骤 2：数据收集</h3>
        <p>获取高质量的数据是发现可靠规律的前提：</p>
        <ul>
          <li><strong>数据来源：</strong> 实验数据、调查数据、观测数据、公开数据集</li>
          <li><strong>抽样方法：</strong> 随机抽样、分层抽样、系统抽样</li>
          <li><strong>样本量：</strong> 根据效应量和检验功效确定</li>
          <li><strong>数据质量：</strong> 检查数据完整性、准确性、一致性</li>
        </ul>
        <div className="alert alert-warning mt-3">
          <strong>⚠️ 注意：</strong> "垃圾进，垃圾出"（GIGO）——低质量的数据会导致错误的结论。
        </div>

        <h3 className="mt-5 mb-3">步骤 3：探索性数据分析（EDA）</h3>
        <p>在正式建模之前，先深入了解数据的特征：</p>
        
        <h4 className="mt-3 mb-2">3.1 数据清洗</h4>
        <ul>
          <li><strong>处理缺失值：</strong> 删除、插补（均值、中位数、KNN）、标记</li>
          <li><strong>处理异常值：</strong> 识别、处理（删除、转换、Winsorization）</li>
          <li><strong>数据类型转换：</strong> 数值型、类别型、时间序列</li>
          <li><strong>数据格式统一：</strong> 单位、编码、命名规范</li>
        </ul>

        <h4 className="mt-3 mb-2">3.2 描述性统计</h4>
        <ul>
          <li><strong>集中趋势：</strong> 均值、中位数、众数</li>
          <li><strong>离散程度：</strong> 方差、标准差、极差、四分位距</li>
          <li><strong>分布形状：</strong> 偏度、峰度</li>
          <li><strong>相关性：</strong> 相关系数矩阵</li>
        </ul>

        <h4 className="mt-3 mb-2">3.3 数据可视化</h4>
        <ul>
          <li><strong>单变量：</strong> 直方图、箱线图、密度图、小提琴图</li>
          <li><strong>双变量：</strong> 散点图、折线图、热力图</li>
          <li><strong>多变量：</strong> 散点图矩阵、平行坐标图</li>
          <li><strong>时间序列：</strong> 时间序列图、季节性分解</li>
        </ul>
        <div className="alert alert-success mt-3">
          <strong>📈 建议：</strong> 花费 70-80% 的时间在 EDA 上，为后续的建模奠定坚实基础。
        </div>

        <h3 className="mt-5 mb-3">步骤 4：统计建模与规律发现</h3>
        <p>运用统计方法发现数据中的规律：</p>
        
        <h4 className="mt-3 mb-2">4.1 相关性分析</h4>
        <p>发现变量之间的关系：</p>
        <div className="formula-box">
          <BlockMath math="r = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^{n}(x_i - \bar{x})^2}\sqrt{\sum_{i=1}^{n}(y_i - \bar{y})^2}}" />
        </div>
        <ul>
          <li><strong>线性相关：</strong> 皮尔逊相关系数</li>
          <li><strong>非线性相关：</strong> 斯皮尔曼等级相关</li>
          <li><strong>应用：</strong> 寻找影响因素、特征选择</li>
        </ul>

        <h4 className="mt-3 mb-2">4.2 回归分析</h4>
        <p>建立变量之间的函数关系：</p>
        <div className="formula-box">
          <BlockMath math="y = \beta_0 + \beta_1x_1 + \beta_2x_2 + \cdots + \beta_px_p + \varepsilon" />
        </div>
        <ul>
          <li><strong>线性回归：</strong> 连续型因变量</li>
          <li><strong>逻辑回归：</strong> 二分类因变量</li>
          <li><strong>多项回归：</strong> 多分类因变量</li>
          <li><strong>应用：</strong> 预测、因果关系推断</li>
        </ul>

        <h4 className="mt-3 mb-2">4.3 假设检验</h4>
        <p>检验发现的规律是否具有统计显著性：</p>
        <ul>
          <li><strong>t 检验：</strong> 比较两组均值</li>
          <li><strong>ANOVA：</strong> 比较多组均值</li>
          <li><strong>卡方检验：</strong> 分类变量关联性</li>
          <li><strong>应用：</strong> 验证假设、发现显著差异</li>
        </ul>

        <h4 className="mt-3 mb-2">4.4 时间序列分析</h4>
        <p>分析随时间变化的规律：</p>
        <ul>
          <li><strong>趋势分析：</strong> 长期增长或下降趋势</li>
          <li><strong>季节性：</strong> 周期性变化模式</li>
          <li><strong>周期性：</strong> 不固定周期的波动</li>
          <li><strong>应用：</strong> 销售预测、经济分析</li>
        </ul>

        <h4 className="mt-3 mb-2">4.5 聚类分析</h4>
        <p>发现数据中的自然分组：</p>
        <ul>
          <li><strong>K-means：</strong> 基于距离的聚类</li>
          <li><strong>层次聚类：</strong> 树状结构聚类</li>
          <li><strong>应用：</strong> 客户细分、市场细分</li>
        </ul>

        <h3 className="mt-5 mb-3">步骤 5：验证与评估</h3>
        <p>确保发现的规律是可靠和有效的：</p>
        <ul>
          <li><strong>模型评估：</strong> R²、RMSE、MAE、准确率、召回率</li>
          <li><strong>交叉验证：</strong> k-fold 交叉验证、留一法</li>
          <li><strong>稳健性检验：</strong> 敏感性分析</li>
          <li><strong>外部验证：</strong> 在独立数据集上验证</li>
        </ul>
        <div className="alert alert-info mt-3">
          <strong>🔬 科学性：</strong> 一个好的规律应该能够在新数据上重复出现。
        </div>

        <h3 className="mt-5 mb-3">步骤 6：解释与结论</h3>
        <p>将统计结果转化为可行动的洞察：</p>
        <ul>
          <li><strong>结果解释：</strong> 用业务语言解释统计结果</li>
          <li><strong>置信度：</strong> 说明结论的可靠性</li>
          <li><strong>实际意义：</strong> 评估发现的规律的实际价值</li>
          <li><strong>局限性：</strong> 明确结论的适用范围和限制</li>
          <li><strong>行动建议：</strong> 基于发现提出具体的行动方案</li>
        </ul>
      </div>

      <div className="content-card">
        <h2 className="card-title">🎓 实际案例：电商用户行为分析</h2>
        
        <h3 className="mt-4 mb-3">案例背景</h3>
        <p>某电商平台希望了解影响用户购买行为的关键因素，以优化营销策略。</p>

        <h3 className="mt-4 mb-3">分析流程</h3>
        
        <h4 className="mt-3 mb-2">1. 问题定义</h4>
        <p><strong>研究问题：</strong> 哪些因素最显著影响用户的购买决策？</p>
        <p><strong>研究假设：</strong> 用户浏览时长、加入购物车次数、优惠券使用与购买概率正相关</p>

        <h4 className="mt-3 mb-2">2. 数据收集</h4>
        <ul>
          <li>收集最近 6 个月的用户行为数据</li>
          <li>包含：用户 ID、浏览时长、页面浏览数、购物车操作、优惠券使用、是否购买</li>
          <li>样本量：50,000 个用户行为记录</li>
        </ul>

        <h4 className="mt-3 mb-2">3. 探索性数据分析</h4>
        <ul>
          <li><strong>数据清洗：</strong> 删除异常值（如浏览时长超过 24 小时的记录）</li>
          <li><strong>描述性统计：</strong> 
            <ul>
              <li>平均浏览时长：15.3 分钟</li>
              <li>平均页面浏览数：8.2 页</li>
              <li>购买转化率：3.2%</li>
            </ul>
          </li>
          <li><strong>可视化：</strong> 绘制购买与非购买用户的浏览时长分布图</li>
        </ul>

        <h4 className="mt-3 mb-2">4. 统计建模</h4>
        <ul>
          <li><strong>相关性分析：</strong>
            <ul>
              <li>浏览时长与购买：r = 0.45（中等正相关）</li>
              <li>购物车操作与购买：r = 0.62（强正相关）</li>
              <li>优惠券使用与购买：r = 0.38（中等正相关）</li>
            </ul>
          </li>
          <li><strong>逻辑回归模型：</strong>
            <div className="formula-box">
              <BlockMath math="P(购买) = \frac{1}{1 + e^{-(0.23 + 0.15×浏览时长 + 0.42×购物车操作 + 0.31×优惠券)}}" />
            </div>
          </li>
          <li><strong>假设检验：</strong> 所有系数的 p 值均 < 0.001，统计显著</li>
        </ul>

        <h4 className="mt-3 mb-2">5. 验证评估</h4>
        <ul>
          <li>模型准确率：87.3%</li>
          <li>AUC 值：0.92</li>
          <li>10 折交叉验证：稳定在 86-88% 之间</li>
        </ul>

        <h4 className="mt-3 mb-2">6. 解释与结论</h4>
        <ul>
          <li><strong>关键发现：</strong> 购物车操作是影响购买的最强因素（系数 0.42）</li>
          <li><strong>置信度：</strong> 95% 置信区间，结果可靠</li>
          <li><strong>行动建议：</strong>
            <ol>
              <li>优化购物车体验，减少放弃率</li>
              <li>针对高浏览时长用户推送优惠券</li>
              <li>在购物车页面增加相关推荐</li>
            </ol>
          </li>
        </ul>
      </div>

      <div className="content-card">
        <h2 className="card-title">🛠️ 常用分析工具</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <h4>编程语言</h4>
            <ul>
              <li><strong>Python：</strong> pandas, numpy, scipy, statsmodels, scikit-learn</li>
              <li><strong>R：</strong> dplyr, ggplot2, caret, lm, glm</li>
              <li><strong>SQL：</strong> 数据查询和聚合</li>
            </ul>
          </div>
          <div className="col-md-6 mb-4">
            <h4>可视化工具</h4>
            <ul>
              <li><strong>Python：</strong> matplotlib, seaborn, plotly</li>
              <li><strong>R：</strong> ggplot2, shiny</li>
              <li><strong>商业工具：</strong> Tableau, Power BI, Excel</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">⚠️ 常见误区与注意事项</h2>
        
        <h3 className="mt-4 mb-3">1. 相关性 ≠ 因果性</h3>
        <p>两个变量相关并不意味着一个导致另一个。需要考虑：</p>
        <ul>
          <li>是否存在第三变量（混杂因素）</li>
          <li>时间顺序是否合理</li>
          <li>是否只是巧合</li>
        </ul>

        <h3 className="mt-4 mb-3">2. 过拟合</h3>
        <p>模型在训练数据上表现很好，但在新数据上表现很差。避免方法：</p>
        <ul>
          <li>使用交叉验证</li>
          <li>简化模型</li>
          <li>正则化</li>
        </ul>

        <h3 className="mt-4 mb-3">3. 选择性偏差</h3>
        <p>样本不能代表总体，导致结论有偏。避免方法：</p>
        <ul>
          <li>确保随机抽样</li>
          <li>检查样本代表性</li>
          <li>使用加权方法</li>
        </ul>

        <h3 className="mt-4 mb-3">4. 数据挖掘谬误</h3>
        <p>在大量数据中寻找模式而不考虑统计显著性。避免方法：</p>
        <ul>
          <li>预先设定假设</li>
          <li>进行多重检验校正</li>
          <li>在独立数据集上验证</li>
        </ul>

        <h3 className="mt-4 mb-3">5. 忽视业务背景</h3>
        <p>统计分析必须结合领域知识。记住：</p>
        <ul>
          <li>统计显著性 ≠ 实际意义</li>
          <li>考虑业务可行性和成本</li>
          <li>咨询领域专家</li>
        </ul>
      </div>

      <div className="content-card">
        <h2 className="card-title">📚 学习路径建议</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="content-card h-100" style={{ background: 'rgba(33, 150, 243, 0.1)' }}>
              <h4>初级</h4>
              <ul>
                <li>描述性统计</li>
                <li>数据可视化</li>
                <li>基础相关性分析</li>
                <li>简单线性回归</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="content-card h-100" style={{ background: 'rgba(76, 175, 80, 0.1)' }}>
              <h4>中级</h4>
              <ul>
                <li>多元回归</li>
                <li>逻辑回归</li>
                <li>假设检验</li>
                <li>聚类分析</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="content-card h-100" style={{ background: 'rgba(156, 39, 176, 0.1)' }}>
              <h4>高级</h4>
              <ul>
                <li>时间序列分析</li>
                <li>机器学习</li>
                <li>因果推断</li>
                <li>A/B 测试</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h2 className="card-title">🎯 总结</h2>
        <p>从数据中发现规律是一个系统性的过程，需要：</p>
        <ul>
          <li><strong>明确的问题导向：</strong> 知道要解决什么问题</li>
          <li><strong>高质量的数据：</strong> 数据是分析的基础</li>
          <li><strong>深入的探索：</strong> 充分理解数据特征</li>
          <li><strong>恰当的方法：</strong> 选择合适的统计工具</li>
          <li><strong>严格的验证：</strong> 确保结果的可靠性</li>
          <li><strong>清晰的解释：</strong> 将统计结果转化为洞察</li>
        </ul>
        <p className="mt-3">
          统计学不是魔法，而是一门科学。掌握正确的流程和方法，
          你就能从数据中提取有价值的规律，为决策提供有力支持。
        </p>
      </div>
    </div>
  );
}

export default DataAnalysis;