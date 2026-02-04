#!/usr/bin/env python3
import re
import html

# LaTeX 到 HTML 的转换映射
GREEK_LETTERS = {
    'alpha': 'α', 'beta': 'β', 'gamma': 'γ', 'delta': 'δ',
    'epsilon': 'ε', 'zeta': 'ζ', 'eta': 'η', 'theta': 'θ',
    'iota': 'ι', 'kappa': 'κ', 'lambda': 'λ', 'mu': 'μ',
    'nu': 'ν', 'xi': 'ξ', 'pi': 'π', 'rho': 'ρ',
    'sigma': 'σ', 'tau': 'τ', 'upsilon': 'υ', 'phi': 'φ',
    'chi': 'χ', 'psi': 'ψ', 'omega': 'ω',
    'Alpha': 'Α', 'Beta': 'Β', 'Gamma': 'Γ', 'Delta': 'Δ',
    'Theta': 'Θ', 'Lambda': 'Λ', 'Pi': 'Π', 'Sigma': 'Σ',
    'Phi': 'Φ', 'Psi': 'Ψ', 'Omega': 'Ω'
}

MATH_SYMBOLS = {
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
    'rightarrow': '→', 'leftarrow': '←',
    'Rightarrow': '⇒', 'Leftarrow': '⇐',
    'Leftrightarrow': '⇔', 'iff': '⇔'
}

def render_latex(latex):
    """将 LaTeX 转换为 HTML"""
    html = latex

    # 移除分隔符
    html = re.sub(r'^\$\$', '', html)
    html = re.sub(r'\$\$$', '', html)
    html = re.sub(r'^\$', '', html)
    html = re.sub(r'\$$', '', html)

    # 先处理嵌套结构
    # 平方根 \sqrt{...}
    def replace_sqrt(match):
        content = match.group(1)
        return f'<span class="katex-sqrt"><span class="katex-sqrt-root">{render_latex(content)}</span></span>'
    html = re.sub(r'\\sqrt\{([^}]+)\}', replace_sqrt, html)

    # n 次根号 \sqrt[n]{...}
    def replace_nthroot(match):
        index = match.group(1)
        content = match.group(2)
        return f'<span class="katex-nthroot"><span class="katex-nthroot-index">{index}</span><span class="katex-nthroot-root">{render_latex(content)}</span></span>'
    html = re.sub(r'\\sqrt\[([^\]]+)\]\{([^}]+)\}', replace_nthroot, html)

    # 二项式系数 \binom{n}{k}
    def replace_binom(match):
        top = match.group(1)
        bottom = match.group(2)
        return f'<span class="katex-binom"><span class="katex-binom-top">{render_latex(top)}</span><span class="katex-binom-bottom">{render_latex(bottom)}</span></span>'
    html = re.sub(r'\\binom\{([^}]+)\}\{([^}]+)\}', replace_binom, html)

    # 分数 \frac{num}{den}
    def replace_frac(match):
        num = match.group(1)
        den = match.group(2)
        return f'<span class="katex-fraction"><span class="katex-numerator">{render_latex(num)}</span><span class="katex-denominator">{render_latex(den)}</span></span>'
    html = re.sub(r'\\frac\{([^}]+)\}\{([^}]+)\}', replace_frac, html)

    # 求和 \sum
    def replace_sum(match):
        if len(match.groups()) == 2:
            sub = match.group(1) if match.group(1) else ''
            sup = match.group(2) if match.group(2) else ''
        else:
            sub = match.group(1) if match.group(1) else ''
            sup = ''
        result = '<span class="katex-op">∑</span>'
        if sub:
            result += f'<sub class="katex-subscript">{sub}</sub>'
        if sup:
            result += f'<sup class="katex-superscript">{sup}</sup>'
        return result
    html = re.sub(r'\\sum_\{([^}]+)\}\^\{([^}]+)\}', replace_sum, html)
    html = re.sub(r'\\sum\^\{([^}]+)\}_\{([^}]+)\}', replace_sum, html)
    html = re.sub(r'\\sum_\{([^}]+)\}', replace_sum, html)
    html = re.sub(r'\\sum\^\{([^}]+)\}', replace_sum, html)
    html = re.sub(r'\\sum(?![a-zA-Z])', '<span class="katex-op">∑</span>', html)

    # 积分 \int
    def replace_int(match):
        if len(match.groups()) == 2:
            sub = match.group(1) if match.group(1) else ''
            sup = match.group(2) if match.group(2) else ''
        else:
            sub = match.group(1) if match.group(1) else ''
            sup = ''
        result = '<span class="katex-op">∫</span>'
        if sub:
            result += f'<sub class="katex-subscript">{sub}</sub>'
        if sup:
            result += f'<sup class="katex-superscript">{sup}</sup>'
        return result
    html = re.sub(r'\\int_\{([^}]+)\}\^\{([^}]+)\}', replace_int, html)
    html = re.sub(r'\\int\^\{([^}]+)\}_\{([^}]+)\}', replace_int, html)
    html = re.sub(r'\\int_\{([^}]+)\}', replace_int, html)
    html = re.sub(r'\\int\^\{([^}]+)\}', replace_int, html)
    html = re.sub(r'\\int(?![a-zA-Z])', '<span class="katex-op">∫</span>', html)

    # 乘积 \prod
    def replace_prod(match):
        if len(match.groups()) == 2:
            sub = match.group(1) if match.group(1) else ''
            sup = match.group(2) if match.group(2) else ''
        else:
            sub = match.group(1) if match.group(1) else ''
            sup = ''
        result = '<span class="katex-op">∏</span>'
        if sub:
            result += f'<sub class="katex-subscript">{sub}</sub>'
        if sup:
            result += f'<sup class="katex-superscript">{sup}</sup>'
        return result
    html = re.sub(r'\\prod_\{([^}]+)\}\^\{([^}]+)\}', replace_prod, html)
    html = re.sub(r'\\prod\^\{([^}]+)\}_\{([^}]+)\}', replace_prod, html)
    html = re.sub(r'\\prod_\{([^}]+)\}', replace_prod, html)
    html = re.sub(r'\\prod\^\{([^}]+)\}', replace_prod, html)
    html = re.sub(r'\\prod(?![a-zA-Z])', '<span class="katex-op">∏</span>', html)

    # 希腊字母
    for name, symbol in GREEK_LETTERS.items():
        html = re.sub(rf'\\{name}(?![a-zA-Z])', f'<span class="katex-symbol">{symbol}</span>', html)

    # 数学符号
    for name, symbol in MATH_SYMBOLS.items():
        html = re.sub(rf'\\{name}(?![a-zA-Z])', f'<span class="katex-symbol">{symbol}</span>', html)

    # \bar
    html = re.sub(r'\\bar\{([^}]+)\}', r'<span class="katex-symbol">\1̄</span>', html)

    # \hat
    html = re.sub(r'\\hat\{([^}]+)\}', r'<span class="katex-symbol">\1̂</span>', html)

    # \text
    html = re.sub(r'\\text\{([^}]+)\}', r'<span class="katex-text">\1</span>', html)

    # \operatorname
    html = re.sub(r'\\operatorname\{([^}]+)\}', r'<span class="katex-operator">\1</span>', html)

    # 箭头
    html = re.sub(r'\\rightarrow(?![a-zA-Z])', '<span class="katex-symbol">→</span>', html)
    html = re.sub(r'\\leftarrow(?![a-zA-Z])', '<span class="katex-symbol">←</span>', html)
    html = re.sub(r'\\Rightarrow(?![a-zA-Z])', '<span class="katex-symbol">⇒</span>', html)
    html = re.sub(r'\\Leftarrow(?![a-zA-Z])', '<span class="katex-symbol">⇐</span>', html)
    html = re.sub(r'\\Leftrightarrow(?![a-zA-Z])', '<span class="katex-symbol">⇔</span>', html)

    # 函数
    html = re.sub(r'\\sin(?![a-zA-Z])', '<span class="katex-operator">sin</span>', html)
    html = re.sub(r'\\cos(?![a-zA-Z])', '<span class="katex-operator">cos</span>', html)
    html = re.sub(r'\\tan(?![a-zA-Z])', '<span class="katex-operator">tan</span>', html)
    html = re.sub(r'\\ln(?![a-zA-Z])', '<span class="katex-operator">ln</span>', html)
    html = re.sub(r'\\log(?![a-zA-Z])', '<span class="katex-operator">log</span>', html)

    # 极限
    def replace_lim(match):
        sub = match.group(1) if match.group(1) else ''
        result = '<span class="katex-operator">lim</span>'
        if sub:
            result += f'<sub class="katex-subscript">{sub}</sub>'
        return result
    html = re.sub(r'\\lim_\{([^}]+)\}', replace_lim, html)
    html = re.sub(r'\\lim(?![a-zA-Z])', '<span class="katex-operator">lim</span>', html)

    # 矩阵
    def replace_pmatrix(match):
        content = match.group(1)
        rows = content.strip().split('\\\\')
        rows = [r.strip() for r in rows if r.strip()]
        matrix_html = '<span class="katex-matrix">('
        for i, row in enumerate(rows):
            if i > 0:
                matrix_html += '<br>'
            cells = [c.strip() for c in row.split('&')]
            matrix_html += '&nbsp;&nbsp;'.join(cells)
        matrix_html += ')</span>'
        return matrix_html
    html = re.sub(r'\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}', replace_pmatrix, html)

    # cases
    def replace_cases(match):
        content = match.group(1)
        lines = content.strip().split('\\\\')
        lines = [l.strip() for l in lines if l.strip()]
        cases_html = '<span class="katex-cases">'
        for line in lines:
            parts = [p.strip() for p in line.split('&')]
            if len(parts) == 2:
                cases_html += f'<span class="katex-case-row"><span class="katex-case-condition">{render_latex(parts[0])}</span><span class="katex-case-value">{render_latex(parts[1])}</span></span>'
            else:
                cases_html += f'<span class="katex-case-row">{render_latex(parts[0])}</span>'
        cases_html += '</span>'
        return cases_html
    html = re.sub(r'\\begin\{cases\}([\s\S]*?)\\end\{cases\}', replace_cases, html)

    # 括号
    html = re.sub(r'\\left\(', '<span class="katex-paren">(</span>', html)
    html = re.sub(r'\\right\)', '<span class="katex-paren">)</span>', html)
    html = re.sub(r'\\left\[', '<span class="katex-bracket">[</span>', html)
    html = re.sub(r'\\right\]', '<span class="katex-bracket">]</span>', html)

    # 下标
    html = re.sub(r'_\{([^}]+)\}', r'<sub class="katex-subscript">\1</sub>', html)
    html = re.sub(r'_([a-zA-Z0-9])', r'<sub class="katex-subscript">\1</sub>', html)

    # 上标
    html = re.sub(r'\^\{([^}]+)\}', r'<sup class="katex-superscript">\1</sup>', html)
    html = re.sub(r'\^([a-zA-Z0-9])', r'<sup class="katex-superscript">\1</sup>', html)

    return html

def process_file(filepath):
    """处理单个 HTML 文件"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 替换行内公式 $...$
    def replace_inline(match):
        latex = match.group(0)
        html = render_latex(latex)
        return f'<span class="katex katex-inline">{html}</span>'

    # 替换块级公式 $$...$$
    def replace_display(match):
        latex = match.group(0)
        html = render_latex(latex)
        return f'<span class="katex katex-display">{html}</span>'

    # 先处理块级公式
    content = re.sub(r'\$\$[^$]+\$\$', replace_display, content)
    # 再处理行内公式
    content = re.sub(r'\$[^$]+\$', replace_inline, content)

    # 额外处理：转换所有残留的 LaTeX 命令
    content = render_latex(content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'处理完成: {filepath}')

if __name__ == '__main__':
    import sys
    html_files = ['basics.html', 'probability.html', 'inference.html', 'sampling.html']
    for f in html_files:
        process_file(f)
