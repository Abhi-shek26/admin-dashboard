import React from 'react';
import { Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DynamicBarChart } from './ClientOnlyChart';

interface ChartData {
  name: string;
  value: number;
}

interface CareerStageChartProps {
  data: ChartData[];
}

const CareerStageChart: React.FC<CareerStageChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <DynamicBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" name="Number of Users" />
      </DynamicBarChart>
    </ResponsiveContainer>
  );
};

export default CareerStageChart;
