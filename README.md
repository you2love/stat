# 统计学学习平台

这是一个纯静态网站，提供交互式统计学教程。通过清晰的课程结构和可视化示例，帮助学习者掌握统计学的核心概念和方法。

## 项目结构

```
stat-tutorial/
├── index.html          # 首页
├── basics.html         # 统计学基础
├── probability.html    # 概率论基础
├── inference.html      # 统计推断
├── sampling.html       # 设计与抽样
├── data-analysis.html  # 数据分析流程
├── assets/             # 静态资源
│   ├── bootstrap-custom.css
│   ├── bootstrap-custom.js
│   ├── katex-custom.css
│   ├── katex-custom.js
│   ├── chartjs-custom.js
│   └── bootstrap/
├── styles.css          # 全局样式
└── README.md
```

## 功能特点

- 📊 **统计学基础**：学习均值、中位数、众数、方差、标准差等核心概念
- 🎲 **概率论基础**：掌握概率分布、贝叶斯定理、条件概率等重要理论
- 🔍 **统计推断**：理解假设检验、置信区间、回归分析等高级方法
- 📋 **设计与抽样**：学习实验设计、抽样方法、数据收集
- 🎯 **数据分析流程**：学习如何从数据中利用统计学找到规律

## 如何运行

### 使用 Python (推荐)

```bash
# Python 3
python3 -m http.server 8000

# 访问 http://localhost:8000
```

### 使用 Node.js

```bash
# 安装 http-server (如果尚未安装)
npm install -g http-server

# 运行
http-server -p 8000

# 或使用 npm start
npm start
```

### 直接打开

由于这是一个纯静态网站，你也可以直接在浏览器中打开 HTML 文件。不过，某些功能可能需要通过 HTTP 服务器运行才能正常工作。

## 部署

### GitHub Pages

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支作为源

### 其他静态托管服务

该网站可以部署到任何支持静态文件的托管服务：
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3

## 技术栈

- 纯 HTML5 + CSS3 + JavaScript
- Bootstrap 5 (样式)
- KaTeX (数学公式渲染)
- Chart.js (图表)

## 开发

编辑 HTML 文件后，刷新浏览器即可看到更改。不需要构建过程。

## 许可证

MIT