import React from 'react';
import { Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DynamicPieChart } from './ClientOnlyChart';

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface CountryDistributionChartProps {
  data: ChartData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

const CountryDistributionChart: React.FC<CountryDistributionChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <DynamicPieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={(entry) => entry.name}
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

export default CountryDistributionChart;
