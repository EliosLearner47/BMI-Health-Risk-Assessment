import { Link } from 'react-router-dom';
import { BookOpen, Calculator, TrendingUp, Shield } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';

const scoringTable = [
  { factor: 'BMI — Normal',              points: 0 },
  { factor: 'BMI — Underweight',         points: 1 },
  { factor: 'BMI — Overweight',          points: 1 },
  { factor: 'BMI — Obesity',             points: 2 },
  { factor: 'Activity — Very Active',    points: 0 },
  { factor: 'Activity — Moderately Active', points: 0 },
  { factor: 'Activity — Lightly Active', points: 1 },
  { factor: 'Activity — Sedentary',      points: 2 },
  { factor: 'Smoking — Never',           points: 0 },
  { factor: 'Smoking — Former',          points: 1 },
  { factor: 'Smoking — Current',         points: 2 },
  { factor: 'Each additional risk factor', points: 1 },
];

const bmiCategories = [
  { range: '< 18.5',      cat: 'Underweight', color: 'text-blue-600 dark:text-blue-400',  bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { range: '18.5 – 24.9', cat: 'Normal',      color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
  { range: '25.0 – 29.9', cat: 'Overweight',  color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  { range: '≥ 30.0',      cat: 'Obesity',     color: 'text-red-600 dark:text-red-400',    bg: 'bg-red-50 dark:bg-red-900/20' },
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-slide-up space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-7 h-7 text-primary-600 dark:text-primary-400" />
          <h1 className="page-title">How It Works</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
          This page explains the methodology behind each calculation — fully transparent with no black-box AI.
        </p>
      </div>

      {/* BMI Calculation */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="section-title">BMI Calculation</h2>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          Body Mass Index (BMI) is a numerical value derived from a person's weight and height. It is used as a screening tool by health organisations worldwide to broadly categorise adults.
        </p>

        {/* Formula */}
        <div className="p-5 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Standard Formula</p>
          <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
            BMI = Weight (kg) ÷ Height (m)²
          </p>
          <p className="text-xs text-slate-400 mt-2">Result is rounded to one decimal place.</p>
        </div>

        {/* Example */}
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800 text-sm">
          <p className="font-semibold text-primary-700 dark:text-primary-400 mb-1">Example:</p>
          <p className="text-slate-600 dark:text-slate-300">
            Weight = 70 kg, Height = 175 cm (1.75 m)<br />
            BMI = 70 ÷ (1.75)² = 70 ÷ 3.0625 ≈ <strong>22.9</strong> → <strong>Normal</strong>
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wide">Standard Adult BMI Categories (WHO)</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {bmiCategories.map(({ range, cat, color, bg }) => (
              <div key={cat} className={`flex items-center justify-between p-3 rounded-xl ${bg} border border-slate-100 dark:border-slate-700`}>
                <span className={`font-bold ${color}`}>{cat}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-mono">{range}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700 text-xs text-amber-700 dark:text-amber-400">
          ⚠️ BMI is a population-level screening measure. It does not directly measure body fat, account for muscle mass, bone density, or ethnicity-specific risk thresholds.
        </div>
      </div>

      {/* Risk Indicator */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="section-title">Educational Risk Indicator</h2>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          The risk indicator is a <strong>project-specific educational rule-based scoring system</strong>. It assigns points to four factors and sums them to produce an indicator label. This is NOT a clinically validated risk prediction tool.
        </p>

        {/* Scoring table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Factor</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Points Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {scoringTable.map(({ factor, points }) => (
                <tr key={factor} className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{factor}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span className={`badge font-bold ${
                      points === 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                      points === 1 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                                     'bg-red-100   text-red-700   dark:bg-red-900/40   dark:text-red-300'
                    }`}>
                      +{points}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Classification */}
        <div>
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wide">Risk Level Classification</h3>
          <div className="grid grid-cols-3 gap-2 text-sm text-center">
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="font-extrabold text-green-700 dark:text-green-400 text-lg">0–2</p>
              <p className="text-green-600 dark:text-green-500 font-semibold text-xs">Lower Risk Indicator</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <p className="font-extrabold text-amber-700 dark:text-amber-400 text-lg">3–5</p>
              <p className="text-amber-600 dark:text-amber-500 font-semibold text-xs">Moderate Risk Indicator</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="font-extrabold text-red-700 dark:text-red-400 text-lg">6+</p>
              <p className="text-red-600 dark:text-red-500 font-semibold text-xs">Higher Risk Indicator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="card p-6 flex items-start gap-3">
        <Shield className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Privacy Architecture</h2>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc ml-4">
            <li>All BMI and risk calculations are performed in your browser using JavaScript.</li>
            <li>Assessment history is stored in <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded text-xs">localStorage</code> on your device.</li>
            <li>No data is transmitted to any external server.</li>
            <li>No cookies, analytics, or third-party scripts are used.</li>
            <li>You can delete your history at any time from the History page.</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <Disclaimer />

      {/* CTA */}
      <div className="text-center">
        <Link to="/assessment" className="btn-primary mx-auto inline-flex text-lg px-8 py-4">
          Start Your Assessment
        </Link>
      </div>
    </div>
  );
}
