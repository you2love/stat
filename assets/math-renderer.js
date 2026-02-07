// 简化的公式渲染器 - 专门处理中文公式
(function() {
  'use strict';

  window.renderMathInElement = function(element, options) {
    options = options || {};
    const delimiters = options.delimiters || [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ];

    console.log('开始渲染公式...');
    console.log('元素:', element);

    // 获取所有包含公式的元素
    const formulaElements = element.querySelectorAll('.formula-box');
    console.log('找到 formula-box 元素数量:', formulaElements.length);

    formulaElements.forEach((el, index) => {
      console.log(`处理 formula-box ${index}:`, el.innerHTML.trim());

      // 提取公式内容
      let html = el.innerHTML.trim();

      // 移除 $$ 分隔符
      html = html.replace(/^\$\$/, '').replace(/\$\$$$/, '');

      console.log('公式内容:', html);

      // 渲染公式
      const rendered = renderFormula(html, true);
      console.log('渲染结果:', rendered);

      // 更新元素内容
      el.innerHTML = rendered;
    });

    // 处理内联公式
    renderInlineFormulas(element, delimiters);
  };

  function renderInlineFormulas(element, delimiters) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (!node.parentNode) return NodeFilter.FILTER_REJECT;
          const tag = node.parentNode.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' ||
              node.parentNode.classList && node.parentNode.classList.contains('formula-box')) {
            return NodeFilter.FILTER_REJECT;
          }
          const text = node.nodeValue;
          for (const delim of delimiters) {
            if (!delim.display && text.includes(delim.left) && text.includes(delim.right)) {
              return NodeFilter.FILTER_ACCEPT;
            }
          }
          return NodeFilter.FILTER_REJECT;
        }
      },
      false
    );

    const nodesToReplace = [];
    let node;
    while (node = walker.nextNode()) {
      for (const delim of delimiters) {
        if (!delim.display && node.nodeValue.includes(delim.left) && node.nodeValue.includes(delim.right)) {
          nodesToReplace.push({node, delim});
          break;
        }
      }
    }

    nodesToReplace.forEach(({node, delim}) => {
      let text = node.nodeValue;
      const regex = new RegExp(escapeRegex(delim.left) + '([^' + escapeRegex(delim.right) + ']+)' + escapeRegex(delim.right), 'g');
      text = text.replace(regex, (match, formula) => {
        return '<span class="katex katex-inline">' + renderFormula(formula, false) + '</span>';
      });
      const span = document.createElement('span');
      span.innerHTML = text;
      node.parentNode.replaceChild(span, node);
    });
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function renderFormula(latex, display) {
    let html = latex;

    // 处理 \text{...}
    html = html.replace(/\\text\{([^}]+)\}/g, '<span class="katex-text">$1</span>');

    // 处理分数 \frac{num}{den}
    html = html.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g,
      '<span class="katex-fraction"><span class="katex-numerator">$1</span><span class="katex-denominator">$2</span></span>');

    // 处理数学符号
    const symbols = {
      'times': '×',
      'div': '÷',
      'cdot': '·',
      'pm': '±',
      'mp': '∓',
      'leq': '≤',
      'geq': '≥',
      'neq': '≠',
      'approx': '≈',
      'infty': '∞',
      'partial': '∂',
      'nabla': '∇',
      'sqrt': '√',
      'sum': '∑',
      'prod': '∏',
      'int': '∫',
      'cup': '∪',
      'cap': '∩',
      'in': '∈',
      'notin': '∉',
      'forall': '∀',
      'exists': '∃',
      'therefore': '∴',
      'because': '∵',
      'rightarrow': '→',
      'leftarrow': '←',
      'Rightarrow': '⇒',
      'Leftarrow': '⇐',
      'Leftrightarrow': '⇔'
    };

    for (const [cmd, symbol] of Object.entries(symbols)) {
      html = html.replace(new RegExp('\\\\' + cmd + '(?!a-zA-Z)', 'g'), symbol);
    }

    // 处理百分比
    html = html.replace(/%/g, '%');

    // 处理上标 ^{...}
    html = html.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
    html = html.replace(/\^([a-zA-Z0-9])/g, '<sup>$1</sup>');

    // 处理下标 _{...}
    html = html.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
    html = html.replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>');

    // 处理空格
    html = html.replace(/\\;/g, ' ');

    return html;
  }
})();
