'use client'

import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

// Register Chart.js components
Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.BarElement,
  Chart.BarController,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend
);

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart.Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    // Destroy existing chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Prepare data for Chart.js
    const labels = data.map(item => 
      new Date(item.date).toLocaleDateString('en-KE', { day: 'numeric' })
    );
    const revenues = data.map(item => item.revenue);

    chartInstance.current = new Chart.Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: revenues,
          backgroundColor: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 160);
            gradient.addColorStop(0, '#FF9E58');
            gradient.addColorStop(1, '#FF6B35');
            return gradient;
          },
          borderRadius: {
            topLeft: 4,
            topRight: 4,
            bottomLeft: 0,
            bottomRight: 0
          },
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            cornerRadius: 6,
            displayColors: false,
            callbacks: {
              title: (context) => {
                const dataIndex = context[0].dataIndex;
                return new Date(data[dataIndex].date).toLocaleDateString('en-KE', { 
                  weekday: 'short', 
                  day: 'numeric', 
                  month: 'short' 
                });
              },
              label: (context) => {
                return `Revenue: KSh ${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            },
            ticks: {
              color: '#6B7280',
              font: {
                size: 12
              }
            }
          },
          y: {
            display: false,
            beginAtZero: true
          }
        },
        layout: {
          padding: {
            top: 10
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-900 font-medium mb-4">Daily Revenue</h3>
      <div className="h-40">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default RevenueChart;