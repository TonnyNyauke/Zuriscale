// src/components/dashboard/RevenueChart.tsx
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

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

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
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 120);
            gradient.addColorStop(0, '#FF9E58');
            gradient.addColorStop(1, '#FF6B35');
            return gradient;
          },
          borderRadius: {
            topLeft: 6,
            topRight: 6,
            bottomLeft: 0,
            bottomRight: 0
          },
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            titleColor: 'white',
            bodyColor: 'white',
            cornerRadius: 8,
            displayColors: false,
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
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
                return `KSh ${context.parsed.y.toLocaleString()}`;
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
                size: 11,
                weight: 'bold'
              },
              maxTicksLimit: 7
            }
          },
          y: {
            display: false,
            beginAtZero: true
          }
        },
        layout: {
          padding: {
            top: 12,
            left: 4,
            right: 4
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 pb-3 border-b border-gray-100">
        <h3 className="text-gray-900 font-semibold text-lg">Daily Revenue</h3>
        <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
      </div>
      <div className="p-4">
        <div className="h-32 sm:h-40">
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
