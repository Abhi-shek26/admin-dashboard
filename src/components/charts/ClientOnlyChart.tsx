import dynamic from 'next/dynamic';
import React from 'react';

const DynamicPieChart = dynamic(
  () => import('recharts').then((mod) => mod.PieChart),
  { ssr: false }
);
const DynamicBarChart = dynamic(
  () => import('recharts').then((mod) => mod.BarChart),
  { ssr: false }
);
const DynamicLineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart),
  { ssr: false }
);

export { DynamicPieChart, DynamicBarChart, DynamicLineChart };