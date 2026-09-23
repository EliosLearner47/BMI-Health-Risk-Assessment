import { RiskBreakdownItem } from '../types';
import { Info } from 'lucide-react';

interface RiskBreakdownProps {
  breakdown: RiskBreakdownItem[];
  totalScore: number;
}

function PointsBadge({ points }: { points: number }) {
  const color =
    points === 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
    points === 1 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                   'bg-red-100   text-red-700   dark:bg-red-900/40   dark:text-red-300';
  return (
    <span className={`badge ${color} text-xs font-bold min-w-[3rem] justify-center`}>
      +{points}
    </span>
  );
}

export default function RiskBreakdown({ breakdown, totalScore }: RiskBreakdownProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Info className="w-5 h-5 text-primary-500" />
        <h3 className="font-bold text-slate-800 dark:text-slate-100">How this result was calculated</h3>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        This is a project-specific educational scoring system. Each factor below contributes points toward the total risk score. The calculation is fully transparent and rule-based.
      </p>

      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Factor</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Value</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {breakdown.map((item) => (
              <tr key={item.factor} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{item.factor}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.value}</td>
                <td className="px-4 py-3 text-center">
                  <PointsBadge points={item.points} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-t-2 border-slate-200 dark:border-slate-700">
              <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-100" colSpan={2}>Total Score</td>
              <td className="px-4 py-3 text-center">
                <span className="badge bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 text-sm font-extrabold min-w-[3rem] justify-center">
                  {totalScore}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Scoring reference */}
      <div className="grid grid-cols-3 gap-2 text-xs text-center">
        <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-medium">
          0–2 → Lower
        </div>
        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 font-medium">
          3–5 → Moderate
        </div>
        <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 font-medium">
          6+ → Higher
        </div>
      </div>
    </div>
  );
}
