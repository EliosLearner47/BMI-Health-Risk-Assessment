import { RiskLevel } from '../types';
import { ShieldCheck, ShieldAlert, ShieldX, AlertTriangle } from 'lucide-react';

interface RiskIndicatorProps {
  riskLevel: RiskLevel;
  totalScore: number;
}

const config = {
  Lower: {
    icon: ShieldCheck,
    label: 'Lower Risk Indicator',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-300 dark:border-green-700',
    icon_color: 'text-green-500',
    text: 'text-green-700 dark:text-green-400',
    description: 'Based on the information you provided, your educational risk score is in the lower range.',
  },
  Moderate: {
    icon: ShieldAlert,
    label: 'Moderate Risk Indicator',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-300 dark:border-amber-700',
    icon_color: 'text-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
    description: 'Based on the information you provided, your educational risk score is in the moderate range.',
  },
  Higher: {
    icon: ShieldX,
    label: 'Higher Risk Indicator',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-300 dark:border-red-700',
    icon_color: 'text-red-500',
    text: 'text-red-700 dark:text-red-400',
    description: 'Based on the information you provided, your educational risk score is in the higher range.',
  },
};

export default function RiskIndicator({ riskLevel, totalScore }: RiskIndicatorProps) {
  const { icon: Icon, label, bg, border, icon_color, text, description } = config[riskLevel];

  return (
    <div className={`rounded-2xl border-2 ${bg} ${border} p-6 space-y-3`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-8 h-8 ${icon_color}`} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Risk Indicator</p>
          <h3 className={`text-2xl font-extrabold ${text}`}>{label}</h3>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>

      {/* Score pill */}
      <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 rounded-full px-4 py-1.5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Educational Score:</span>
        <span className={`font-extrabold text-lg ${text}`}>{totalScore}</span>
      </div>

      {/* Prominent disclaimer */}
      <div className="flex items-start gap-2 p-3 bg-white/60 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-400 border border-white dark:border-slate-700">
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p>
          <strong>This score is not medically validated</strong> and should not be used to diagnose or predict any disease. It is a project-specific educational rule-based indicator only.
        </p>
      </div>
    </div>
  );
}
