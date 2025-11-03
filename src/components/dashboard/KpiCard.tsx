import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 text-indigo-600 bg-indigo-100 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
