import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, description, trend }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-slate-500 mt-1">
            {trend && <span className="text-emerald-600 font-medium mr-1">{trend}</span>}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};