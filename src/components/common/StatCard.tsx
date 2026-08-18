import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  gradient,
  iconBg,
  subtext
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 border border-slate-800 glass-card bg-gradient-to-br ${gradient} transition-all duration-300 hover:scale-[1.02] shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-white mt-1 tracking-tight">{value}</h3>
        </div>
        <div className={`p-3.5 rounded-xl ${iconBg} text-white shadow-inner flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {(change || subtext) && (
        <div className="mt-4 flex items-center justify-between text-xs">
          {change && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${
                isPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {isPositive ? '↑' : '↓'} {change}
            </span>
          )}
          {subtext && <span className="text-slate-400 font-normal">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
