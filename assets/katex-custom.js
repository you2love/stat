// KaTeX-like JavaScript - Minimal implementation for math rendering
// This is a simplified version that renders basic LaTeX math

(function() {
  'use strict';

  // Basic LaTeX to HTML renderer
  function renderMath(text, displayMode) {
    let html = text;

    // Remove delimiters
    html = html.replace(/^\$\$/, '').replace(/\$\$$$/, '');
    html = html.replace(/^\$/, '').replace(/\$$$/, '');

    // Process nested structures first (from innermost to outermost)
    // Square root \sqrt{...} - process BEFORE frac
    html = html.replace(/\\sqrt\{([^}]+)\}/g,
      '<span class="katex-sqrt"><span class="katex-sqrt-root">$1</span></span>');

    // Nth root \sqrt[n]{...} - process BEFORE frac
    html = html.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g,
      '<span class="katex-nthroot"><span class="katex-nthroot-index">$1</span><span class="katex-nthroot-root">$2</span></span>');

    // Binomial coefficient \binom{n}{k} - process BEFORE frac
    html = html.replace(/\\binom\{([^}]+)\}\{([^}]+)\}/g,
      '<span class="katex-binom"><span class="katex-binom-top">$1</span><span class="katex-binom-bottom">$2</span></span>');

    // Fractions \frac{num}{den} - process AFTER sqrt/binom to avoid nesting issues
    html = html.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g,
      '<span class="katex-fraction"><span class="katex-numerator">$1</span><span class="katex-denominator">$2</span></span>');

    // Summation with limits \sum_{...}^{...}
    html = html.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, '<span class="katex-op">∑<sub>$1</sub><sup>$2</sup></span>');
    html = html.replace(/\\sum\^\{([^}]+)\}_\{([^}]+)\}/g, '<span class="katex-op">∑<sub>$2</sub><sup>$1</sup></span>');
    html = html.replace(/\\sum_\{([^}]+)\}/g, '<span class="katex-op">∑<sub>$1</sub></span>');
    html = html.replace(/\\sum\^\{([^}]+)\}/g, '<span class="katex-op">∑<sup>$1</sup></span>');
    html = html.replace(/\\sum/g, '<span class="katex-op">∑</span>');

    // Product with limits \prod_{...}^{...}
    html = html.replace(/\\prod_\{([^}]+)\}\^\{([^}]+)\}/g, '<span class="katex-op">∏<sub>$1</sub><sup>$2</sup></span>');
    html = html.replace(/\\prod\^\{([^}]+)\}_\{([^}]+)\}/g, '<span class="katex-op">∏<sub>$2</sub><sup>$1</sup></span>');
    html = html.replace(/\\prod_\{([^}]+)\}/g, '<span class="katex-op">∏<sub>$1</sub></span>');
    html = html.replace(/\\prod\^\{([^}]+)\}/g, '<span class="katex-op">∏<sup>$1</sup></span>');
    html = html.replace(/\\prod/g, '<span class="katex-op">∏</span>');

    // Integral with limits \int_{...}^{...}
    html = html.replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, '<span class="katex-op">∫<sub>$1</sub><sup>$2</sup></span>');
    html = html.replace(/\\int\^\{([^}]+)\}_\{([^}]+)\}/g, '<span class="katex-op">∫<sub>$2</sub><sup>$1</sup></span>');
    html = html.replace(/\\int_\{([^}]+)\}/g, '<span class="katex-op">∫<sub>$1</sub></span>');
    html = html.replace(/\\int\^\{([^}]+)\}/g, '<span class="katex-op">∫<sup>$1</sup></span>');
    html = html.replace(/\\int/g, '<span class="katex-op">∫</span>');

    // Greek letters (must match whole words to avoid partial matches)
    const greekLetters = {
      'alpha': 'α', 'beta': 'β', 'gamma': 'γ', 'delta': 'δ',
      'epsilon': 'ε', 'zeta': 'ζ', 'eta': 'η', 'theta': 'θ',
      'iota': 'ι', 'kappa': 'κ', 'lambda': 'λ', 'mu': 'μ',
      'nu': 'ν', 'xi': 'ξ', 'pi': 'π', 'rho': 'ρ',
      'sigma': 'σ', 'tau': 'τ', 'upsilon': 'υ', 'phi': 'φ',
      'chi': 'χ', 'psi': 'ψ', 'omega': 'ω',
      'Alpha': 'Α', 'Beta': 'Β', 'Gamma': 'Γ', 'Delta': 'Δ',
      'Theta': 'Θ', 'Lambda': 'Λ', 'Pi': 'Π', 'Sigma': 'Σ',
      'Phi': 'Φ', 'Psi': 'Ψ', 'Omega': 'Ω'
    };

    Object.keys(greekLetters).forEach(key => {
      const regex = new RegExp('\\\\' + key + '(?![a-zA-Z])', 'g');
      html = html.replace(regex, '<span class="katex-symbol">' + greekLetters[key] + '</span>');
    });

    // Math symbols (must match whole words)
    const mathSymbols = {
      'infty': '∞', 'partial': '∂', 'nabla': '∇',
      'cdot': '·', 'times': '×', 'div': '÷',
      'pm': '±', 'mp': '∓',
      'leq': '≤', 'geq': '≥',
      'neq': '≠', 'approx': '≈',
      'cap': '∩', 'cup': '∪',
      'subseteq': '⊆', 'supseteq': '⊇',
      'in': '∈', 'notin': '∉',
      'forall': '∀', 'exists': '∃',
      'wedge': '∧', 'vee': '∨',
      'lvert': '|', 'rvert': '|',
      'leftarrow': '←', 'rightarrow': '→',
      'Leftarrow': '⇐', 'Rightarrow': '⇒',
      'Leftrightarrow': '⇔', 'iff': '⇔',
      'percent': '%'
    };

    Object.keys(mathSymbols).forEach(key => {
      if (mathSymbols[key]) {
        const regex = new RegExp('\\\\' + key + '(?![a-zA-Z])', 'g');
        html = html.replace(regex, '<span class="katex-symbol">' + mathSymbols[key] + '</span>');
      }
    });

    // Bar (for x̄, etc.)
    html = html.replace(/\\bar\{([^}]+)\}/g, '<span class="katex-symbol">$1̄</span>');

    // Hat
    html = html.replace(/\\hat\{([^}]+)\}/g, '<span class="katex-symbol">$1̂</span>');

    // Text command \text{...}
    html = html.replace(/\\text\{([^}]+)\}/g, '<span class="katex-text">$1</span>');

    // Operators
    html = html.replace(/\\operatorname\{([^}]+)\}/g, '<span class="katex-operator">$1</span>');

    // Matrix/Vector brackets
    html = html.replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g, function(match, content) {
      const rows = content.trim().split('\\\\').filter(row => row.trim());
      let matrixHtml = '<span class="katex-matrix">(';
      rows.forEach((row, i) => {
        if (i > 0) matrixHtml += '<br>';
        const cells = row.split('&').map(c => c.trim());
        matrixHtml += cells.join('&nbsp;&nbsp;');
      });
      matrixHtml += ')</span>';
      return matrixHtml;
    });

    html = html.replace(/\\vdots/g, '<span class="katex-matrix-dots">⋮</span>');
    html = html.replace(/\\ddots/g, '<span class="katex-matrix-dots">⋱</span>');

    // Cases environment \begin{cases} ... \end{cases}
    html = html.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, function(match, content) {
      const lines = content.trim().split('\\\\').filter(line => line.trim());
      let casesHtml = '<span class="katex-cases">';
      lines.forEach(line => {
        const parts = line.split('&').map(p => p.trim());
        if (parts.length === 2) {
          casesHtml += `<span class="katex-case-row"><span class="katex-case-condition">${parts[0]}</span><span class="katex-case-value">${parts[1]}</span></span>`;
        } else {
          casesHtml += `<span class="katex-case-row">${parts[0]}</span>`;
        }
      });
      casesHtml += '</span>';
      return casesHtml;
    });

    // Brackets
    html = html.replace(/\\left\(/g, '<span class="katex-paren">(</span>');
    html = html.replace(/\\right\)/g, '<span class="katex-paren">)</span>');
    html = html.replace(/\\left\[/g, '<span class="katex-bracket">[</span>');
    html = html.replace(/\\right\]/g, '<span class="katex-bracket">]</span>');
    html = html.replace(/\\left\{/g, '<span class="katex-brace">{</span>');
    html = html.replace(/\\right\}/g, '<span class="katex-brace">}</span>');

    // Arrows
    html = html.replace(/\\rightarrow(?![a-zA-Z])/g, '<span class="katex-symbol">→</span>');
    html = html.replace(/\\leftarrow(?![a-zA-Z])/g, '<span class="katex-symbol">←</span>');
    html = html.replace(/\\Rightarrow(?![a-zA-Z])/g, '<span class="katex-symbol">⇒</span>');
    html = html.replace(/\\Leftarrow(?![a-zA-Z])/g, '<span class="katex-symbol">⇐</span>');
    html = html.replace(/\\Leftrightarrow(?![a-zA-Z])/g, '<span class="katex-symbol">⇔</span>');

    // Logarithm
    html = html.replace(/\\ln(?![a-zA-Z])/g, '<span class="katex-operator">ln</span>');
    html = html.replace(/\\log(?![a-zA-Z])/g, '<span class="katex-operator">log</span>');

    // Trigonometric functions
    html = html.replace(/\\sin(?![a-zA-Z])/g, '<span class="katex-operator">sin</span>');
    html = html.replace(/\\cos(?![a-zA-Z])/g, '<span class="katex-operator">cos</span>');
    html = html.replace(/\\tan(?![a-zA-Z])/g, '<span class="katex-operator">tan</span>');
    html = html.replace(/\\arcsin(?![a-zA-Z])/g, '<span class="katex-operator">arcsin</span>');
    html = html.replace(/\\arccos(?![a-zA-Z])/g, '<span class="katex-operator">arccos</span>');
    html = html.replace(/\\arctan(?![a-zA-Z])/g, '<span class="katex-operator">arctan</span>');

    // Limits notation
    html = html.replace(/\\lim_\{([^}]+)\}/g, '<span class="katex-operator">lim</span><sub>$1</sub>');
    html = html.replace(/\\lim(?![a-zA-Z])/g, '<span class="katex-operator">lim</span>');

    // Other operators
    html = html.replace(/\\det(?![a-zA-Z])/g, '<span class="katex-operator">det</span>');
    html = html.replace(/\\max(?![a-zA-Z])/g, '<span class="katex-operator">max</span>');
    html = html.replace(/\\min(?![a-zA-Z])/g, '<span class="katex-operator">min</span>');
    html = html.replace(/\\sup(?![a-zA-Z])/g, '<span class="katex-operator">sup</span>');
    html = html.replace(/\\inf(?![a-zA-Z])/g, '<span class="katex-operator">inf</span>');

    // Now process subscripts and superscripts (after all other replacements)
    // Subscript _{...}
    html = html.replace(/_\{([^}]+)\}/g, '<sub class="katex-subscript">$1</sub>');
    html = html.replace(/_([a-zA-Z0-9])/g, '<sub class="katex-subscript">$1</sub>');

    // Superscript ^{...}
    html = html.replace(/\^\{([^}]+)\}/g, '<sup class="katex-superscript">$1</sup>');
    html = html.replace(/\^([a-zA-Z0-9])/g, '<sup class="katex-superscript">$1</sup>');

    return html;
  }

  // Auto-render math in element
  function renderMathInElement(element, options) {
    options = options || {};
    const delimiters = options.delimiters || [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ];

    console.log('renderMathInElement 被调用');
    console.log('分隔符:', delimiters);
    console.log('元素:', element);
    console.log('元素HTML:', element.innerHTML);

    // Find all text nodes
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Skip text nodes inside script, style, or already processed math
          if (!node.parentNode) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.parentNode.tagName === 'SCRIPT' ||
              node.parentNode.tagName === 'STYLE' ||
              node.parentNode.classList && node.parentNode.classList.contains('katex')) {
            return NodeFilter.FILTER_REJECT;
          }
          // Accept text nodes that contain delimiters
          const text = node.nodeValue;
          for (const delim of delimiters) {
            if (text.includes(delim.left) && text.includes(delim.right)) {
              console.log('找到匹配的文本节点:', text);
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
      const text = node.nodeValue;
      for (const delim of delimiters) {
        if (text.includes(delim.left) && text.includes(delim.right)) {
          nodesToReplace.push({node, delim});
          break;
        }
      }
    }

    console.log('找到需要渲染的节点数量:', nodesToReplace.length);
    nodesToReplace.forEach((item, i) => {
      console.log(`  节点 ${i}: "${item.node.nodeValue}" (分隔符: ${item.delim.left})`);
    });

    // Replace text nodes with math spans
    nodesToReplace.forEach(({node, delim}) => {
      const text = node.nodeValue;
      console.log('处理节点:', text);
      const parts = text.split(delim.left);
      console.log('分割后:', parts);

      const fragment = document.createDocumentFragment();
      let i = 0;

      while (i < parts.length) {
        if (i > 0) {
          const closingIndex = parts[i].indexOf(delim.right);
          if (closingIndex !== -1) {
            const mathContent = parts[i].substring(0, closingIndex);
            console.log('公式内容:', mathContent);
            const rendered = renderMath(delim.left + mathContent + delim.right, delim.display);
            console.log('渲染结果:', rendered);

            const mathSpan = document.createElement('span');
            mathSpan.className = delim.display ? 'katex katex-display' : 'katex katex-inline';
            mathSpan.innerHTML = rendered;
            fragment.appendChild(mathSpan);

            const remainingText = parts[i].substring(closingIndex + delim.right.length);
            if (remainingText) {
              fragment.appendChild(document.createTextNode(remainingText));
            }
          } else {
            fragment.appendChild(document.createTextNode(delim.left + parts[i]));
          }
        } else {
          if (parts[i]) {
            fragment.appendChild(document.createTextNode(parts[i]));
          }
        }
        i++;
      }

      node.parentNode.replaceChild(fragment, node);
    });
  }

  // Export to global scope
  window.renderMathInElement = renderMathInElement;

})();