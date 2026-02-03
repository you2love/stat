// Chart.js-like JavaScript - Minimal implementation for basic charts

(function() {
  'use strict';

  // Simple Chart class
  class Chart {
    constructor(ctx, config) {
      this.ctx = ctx;
      this.config = config;
      this.canvas = ctx.canvas;
      this.render();
    }

    destroy() {
      if (this.canvas) {
        this.canvas.width = this.canvas.width; // Clear canvas
      }
    }

    render() {
      const { data, options } = this.config;
      const canvas = this.canvas;
      const ctx = this.ctx;

      // Set canvas size
      const container = canvas.parentElement;
      canvas.width = container.clientWidth - 48;
      canvas.height = 400;

      const width = canvas.width;
      const height = canvas.height;
      const padding = 50;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw background
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, width, height);

      // Draw title
      if (options && options.plugins && options.plugins.title && options.plugins.title.display) {
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(options.plugins.title.text, width / 2, 25);
      }

      // Get chart type
      const type = this.config.type;

      if (type === 'bar') {
        this.renderBarChart(ctx, data, width, height, padding, options);
      } else if (type === 'line') {
        this.renderLineChart(ctx, data, width, height, padding, options);
      }
    }

    renderBarChart(ctx, data, width, height, padding, options) {
      const labels = data.labels;
      const values = data.datasets[0].data;
      const dataset = data.datasets[0];

      const chartWidth = width - 2 * padding;
      const chartHeight = height - 2 * padding - 30;

      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      const range = maxValue - minValue || 1;

      const barWidth = chartWidth / labels.length * 0.7;
      const barGap = chartWidth / labels.length * 0.3;

      // Draw axes
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.stroke();

      // Draw bars
      values.forEach((value, i) => {
        const x = padding + i * (barWidth + barGap) + barGap / 2;
        const barHeight = ((value - minValue) / range) * chartHeight;
        const y = height - padding - barHeight;

        // Draw bar
        ctx.fillStyle = dataset.backgroundColor || 'rgba(33, 150, 243, 0.6)';
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw border
        ctx.strokeStyle = dataset.borderColor || 'rgba(33, 150, 243, 1)';
        ctx.lineWidth = dataset.borderWidth || 1;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // Draw label
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barWidth / 2, height - padding + 15);

        // Draw value on top
        ctx.fillStyle = '#333';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      });

      // Draw legend
      if (options && options.plugins && options.plugins.legend && options.plugins.legend.display) {
        const legendY = padding + 10;
        ctx.fillStyle = dataset.backgroundColor || 'rgba(33, 150, 243, 0.6)';
        ctx.fillRect(width - padding - 20, legendY, 15, 15);
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.font = '12px Arial';
        ctx.fillText(dataset.label, width - padding, legendY + 12);
      }
    }

    renderLineChart(ctx, data, width, height, padding, options) {
      const labels = data.labels;
      const values = data.datasets[0].data;
      const dataset = data.datasets[0];

      const chartWidth = width - 2 * padding;
      const chartHeight = height - 2 * padding - 30;

      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      const range = maxValue - minValue || 1;

      // Draw axes
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding, padding);
      ctx.lineTo(padding, height - padding);
      ctx.lineTo(width - padding, height - padding);
      ctx.stroke();

      // Draw axis labels
      if (options && options.scales) {
        // Y-axis label
        if (options.scales.y && options.scales.y.title && options.scales.y.title.display) {
          ctx.save();
          ctx.translate(15, height / 2);
          ctx.rotate(-Math.PI / 2);
          ctx.fillStyle = '#666';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(options.scales.y.title.text, 0, 0);
          ctx.restore();
        }

        // X-axis label
        if (options.scales.x && options.scales.x.title && options.scales.x.title.display) {
          ctx.fillStyle = '#666';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(options.scales.x.title.text, width / 2, height - 10);
        }
      }

      // Calculate points
      const points = values.map((value, i) => {
        const x = padding + (i / (values.length - 1)) * chartWidth;
        const y = height - padding - ((value - minValue) / range) * chartHeight;
        return { x, y };
      });

      // Draw fill area
      if (dataset.fill) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, height - padding);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(points[points.length - 1].x, height - padding);
        ctx.closePath();
        ctx.fillStyle = dataset.backgroundColor || 'rgba(33, 150, 243, 0.1)';
        ctx.fill();
      }

      // Draw line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      if (dataset.tension) {
        // Smooth curve
        for (let i = 0; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.quadraticCurveTo(
          points[points.length - 1].x,
          points[points.length - 1].y,
          points[points.length - 1].x,
          points[points.length - 1].y
        );
      } else {
        // Straight lines
        points.forEach(p => ctx.lineTo(p.x, p.y));
      }

      ctx.strokeStyle = dataset.borderColor || 'rgba(33, 150, 243, 1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw points
      if (dataset.pointRadius !== 0) {
        points.forEach((p, i) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, dataset.pointRadius || 3, 0, Math.PI * 2);
          ctx.fillStyle = dataset.borderColor || 'rgba(33, 150, 243, 1)';
          ctx.fill();
        });
      }

      // Draw legend
      if (options && options.plugins && options.plugins.legend && options.plugins.legend.display) {
        const legendY = padding + 10;
        ctx.fillStyle = dataset.borderColor || 'rgba(33, 150, 243, 1)';
        ctx.fillRect(width - padding - 20, legendY, 15, 15);
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.font = '12px Arial';
        ctx.fillText(dataset.label, width - padding, legendY + 12);
      }
    }
  }

  // Export to global scope
  window.Chart = Chart;

})();