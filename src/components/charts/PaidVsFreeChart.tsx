import React from 'react';
import { Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DynamicPieChart } from './ClientOnlyChart';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface PaidVsFreeChartProps {
  data: ChartData[];
}

const COLORS = ['#00C49F', '#FF8042'];

const PaidVsFreeChart: React.FC<PaidVsFreeChartProps> = ({ data }) => {
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </DynamicPieChart>
    </ResponsiveContainer>
  );
};

export default PaidVsFreeChart;
