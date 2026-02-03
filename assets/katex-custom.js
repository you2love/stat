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

    // Subscript _{...}
    html = html.replace(/_\{([^}]+)\}/g, '<sub class="katex-subscript">$1</sub>');
    html = html.replace(/_([a-zA-Z0-9])/g, '<sub class="katex-subscript">$1</sub>');

    // Superscript ^{...}
    html = html.replace(/\^\{([^}]+)\}/g, '<sup class="katex-superscript">$1</sup>');
    html = html.replace(/\^([a-zA-Z0-9])/g, '<sup class="katex-superscript">$1</sup>');

    // Fractions \frac{num}{den}
    html = html.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g,
      '<span class="katex-fraction"><span class="katex-numerator">$1</span><span class="katex-denominator">$2</span></span>');

    // Square root \sqrt{...}
    html = html.replace(/\\sqrt\{([^}]+)\}/g,
      '<span class="katex-sqrt"><span class="katex-sqrt-root">$1</span></span>');

    // Summation \sum
    html = html.replace(/\\sum/g, '<span class="katex-op">∑</span>');

    // Integral \int
    html = html.replace(/\\int/g, '<span class="katex-op">∫</span>');

    // Greek letters
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
      const regex = new RegExp('\\\\' + key, 'g');
      html = html.replace(regex, '<span class="katex-symbol">' + greekLetters[key] + '</span>');
    });

    // Math symbols
    const mathSymbols = {
      'infty': '∞', 'partial': '∂', 'nabla': '∇',
      'cdot': '·', 'times': '×', 'div': '÷',
      'pm': '±', 'mp': '∓',
      'leq': '≤', 'geq': '≥',
      'neq': '≠', 'approx': '≈',
      'cap': '∩', 'cup': '∪',
      'subseteq': '⊆', 'supseteq': '⊇',
      'in': '∈', 'notin': '∉',
      'forall': '∀', 'exists': '∃'
    };

    Object.keys(mathSymbols).forEach(key => {
      const regex = new RegExp('\\\\' + key, 'g');
      html = html.replace(regex, '<span class="katex-symbol">' + mathSymbols[key] + '</span>');
    });

    // Bar (for x̄, etc.)
    html = html.replace(/\\bar\{([^}]+)\}/g, '<span class="katex-symbol">$1̄</span>');

    // Hat
    html = html.replace(/\\hat\{([^}]+)\}/g, '<span class="katex-symbol">$1̂</span>');

    // Arrow
    html = html.replace(/\\rightarrow/g, '<span class="katex-symbol">→</span>');
    html = html.replace(/\\leftarrow/g, '<span class="katex-symbol">←</span>');

    return html;
  }

  // Auto-render math in element
  function renderMathInElement(element, options) {
    options = options || {};
    const delimiters = options.delimiters || [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ];

    // Find all text nodes
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
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

    // Replace text nodes with math spans
    nodesToReplace.forEach(({node, delim}) => {
      const text = node.nodeValue;
      const parts = text.split(delim.left);

      const fragment = document.createDocumentFragment();
      let i = 0;

      while (i < parts.length) {
        if (i > 0) {
          const closingIndex = parts[i].indexOf(delim.right);
          if (closingIndex !== -1) {
            const mathContent = parts[i].substring(0, closingIndex);
            const mathSpan = document.createElement('span');
            mathSpan.className = delim.display ? 'katex katex-display' : 'katex katex-inline';
            mathSpan.innerHTML = renderMath(delim.left + mathContent + delim.right, delim.display);
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