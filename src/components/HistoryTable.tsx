import { useState } from 'react';
import { Trash2, Eye, ClipboardList, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AssessmentRecord, RiskLevel } from '../types';

interface HistoryTableProps {
  records: AssessmentRecord[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

const riskColors: Record<RiskLevel, string> = {
  Lower:    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Moderate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Higher:   'bg-red-100   text-red-700   dark:bg-red-900/40   dark:text-red-300',
};

const bmiColors: Record<string, string> = {
  Underweight: 'text-blue-600 dark:text-blue-400',
  Normal:      'text-green-600 dark:text-green-400',
  Overweight:  'text-amber-600 dark:text-amber-400',
  Obesity:     'text-red-600 dark:text-red-400',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function ExpandedRow({ record }: { record: AssessmentRecord }) {
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 text-sm space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Age</p>
          <p className="font-medium text-slate-700 dark:text-slate-200">{record.age} yrs</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Gender</p>
          <p className="font-medium text-slate-700 dark:text-slate-200 capitalize">{record.gender}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Height</p>
          <p className="font-medium text-slate-700 dark:text-slate-200">{record.heightCm.toFixed(1)} cm</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Weight</p>
          <p className="font-medium text-slate-700 dark:text-slate-200">{record.weightKg} kg</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Activity</p>
          <p className="font-medium text-slate-700 dark:text-slate-200 capitalize">{record.activityLevel}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Smoking</p>
          <p className="font-medium text-slate-700 dark:text-slate-200 capitalize">{record.smokingStatus}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Risk Factors</p>
          <p className="font-medium text-slate-700 dark:text-slate-200">
            {record.riskFactors.length > 0 ? record.riskFactors.join(', ') : 'None'}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Total Score</p>
          <p className="font-medium text-slate-700 dark:text-slate-200">{record.totalScore} points</p>
        </div>
      </div>
    </div>
  );
}

export default function HistoryTable({ records, onDelete, onClearAll }: HistoryTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  if (records.length === 0) {
    return (
      <div className="card p-12 text-center space-y-3">
        <ClipboardList className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
        <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">No assessments yet</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Complete your first assessment and your results will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header + clear */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {records.length} assessment{records.length > 1 ? 's' : ''} stored locally
        </p>
        {!confirmClear ? (
          <button
            onClick={() => setConfirmClear(true)}
            className="btn-danger"
            aria-label="Clear all assessment history"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        ) : (
          <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span className="text-red-700 dark:text-red-400 text-xs">Delete all {records.length} records?</span>
            <button
              className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => { onClearAll(); setConfirmClear(false); }}
            >
              Yes, Delete
            </button>
            <button
              className="px-3 py-1 text-slate-600 dark:text-slate-400 text-xs font-medium hover:underline"
              onClick={() => setConfirmClear(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {records.map((record) => {
          const isOpen = expanded === record.id;
          return (
            <div key={record.id} className="card overflow-hidden animate-fade-in">
              <div className="p-4 flex items-center justify-between gap-3 flex-wrap">
                {/* Date + main metrics */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{formatDate(record.date)}</p>
                    <p className={`text-2xl font-extrabold ${bmiColors[record.bmiCategory]}`}>{record.bmi.toFixed(1)}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">BMI · {record.bmiCategory}</p>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <span className={`badge ${riskColors[record.riskLevel]}`}>
                      {record.riskLevel} Risk
                    </span>
                    <p className="text-xs text-slate-400 mt-1">Score: {record.totalScore}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setExpanded(isOpen ? null : record.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? 'Hide details' : 'View details'}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {isOpen ? (
                      <><span>Hide</span><ChevronUp className="w-3 h-3" /></>
                    ) : (
                      <><span>Details</span><ChevronDown className="w-3 h-3" /></>
                    )}
                  </button>
                  <button
                    onClick={() => onDelete(record.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label={`Delete record from ${formatDate(record.date)}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isOpen && (
                <div className="px-4 pb-4 animate-fade-in">
                  <ExpandedRow record={record} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
