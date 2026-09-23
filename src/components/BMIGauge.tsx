import { BMICategory } from '../types';
import { bmiToGaugePercent } from '../utils/bmiCalculator';

interface BMIGaugeProps {
  bmi: number;
  category: BMICategory;
}

const zones = [
  { label: 'Underweight', range: '< 18.5', color: 'bg-blue-400',   width: '20%' },
  { label: 'Normal',      range: '18.5–24.9', color: 'bg-green-400', width: '28%' },
  { label: 'Overweight',  range: '25–29.9', color: 'bg-amber-400', width: '22%' },
  { label: 'Obesity',     range: '≥ 30',    color: 'bg-red-400',   width: '30%' },
];

const categoryBadgeColor: Record<BMICategory, string> = {
  Underweight: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Normal:      'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Overweight:  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Obesity:     'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export default function BMIGauge({ bmi, category }: BMIGaugeProps) {
  const percent = bmiToGaugePercent(bmi);

  return (
    <div className="space-y-4">
      {/* BMI value display */}
      <div className="text-center">
        <div className="text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          {bmi.toFixed(1)}
        </div>
        <div className="mt-2">
          <span className={`badge ${categoryBadgeColor[category]} text-sm px-4 py-1.5`}>
            {category}
          </span>
        </div>
      </div>

      {/* Gauge bar */}
      <div className="space-y-2">
        <div className="relative h-5 flex rounded-full overflow-hidden shadow-inner">
          {zones.map((z) => (
            <div key={z.label} className={`${z.color} opacity-80`} style={{ width: z.width }} />
          ))}
          {/* Marker */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-slate-800 dark:bg-white rounded-full shadow-lg transition-all duration-700 ease-out"
            style={{ left: `calc(${percent}% - 2px)` }}
            role="presentation"
          >
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
              ▲
            </div>
          </div>
        </div>

        {/* Zone labels */}
        <div className="flex text-xs text-slate-500 dark:text-slate-400 mt-6">
          {zones.map((z) => (
            <div key={z.label} className="flex flex-col items-center" style={{ width: z.width }}>
              <span className="font-medium text-slate-700 dark:text-slate-300 hidden sm:block">{z.label}</span>
              <span className="text-slate-400 dark:text-slate-500">{z.range}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-1">
        BMI is a screening measure and does not directly measure body fat or diagnose disease.
      </p>
    </div>
  );
}
