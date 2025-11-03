import React from 'react';
import { Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DynamicPieChart } from './ClientOnlyChart';

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface SatisfactionChartProps {
  data: ChartData[];
}

const SATISFACTION_COLORS: Record<string, string> = {
  Happy: '#22c55e',
  Neutral: '#f59e0b', 
  Unhappy: '#ef4444', 
};

const SatisfactionChart: React.FC<SatisfactionChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <DynamicPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={SATISFACTION_COLORS[entry.name] || '#cccccc'} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </DynamicPieChart>
    </ResponsiveContainer>
  );
};

export default SatisfactionChart;
