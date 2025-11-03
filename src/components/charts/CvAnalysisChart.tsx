import React from 'react';
import { Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DynamicLineChart } from './ClientOnlyChart'; 

interface ChartData {
  date: string;
  count: number;
}

interface CvAnalysisChartProps {
  data: ChartData[];
}

const CvAnalysisChart: React.FC<CvAnalysisChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <DynamicLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" name="Analyses per day" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </DynamicLineChart>
    </ResponsiveContainer>
  );
};

export default CvAnalysisChart;
