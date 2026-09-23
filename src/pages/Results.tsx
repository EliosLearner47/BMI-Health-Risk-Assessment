import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Printer, RotateCcw, History, ArrowLeft } from 'lucide-react';
import { ResultsNavState, AssessmentRecord } from '../types';
import { convertFeetToCm } from '../utils/bmiCalculator';
import { saveRecord, generateId } from '../utils/storage';
import BMIGauge from '../components/BMIGauge';
import RiskIndicator from '../components/RiskIndicator';
import RiskBreakdown from '../components/RiskBreakdown';
import RecommendationCard from '../components/RecommendationCard';
import Disclaimer from '../components/Disclaimer';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsNavState | null;

  // Guard: if arrived without state, redirect to assessment
  useEffect(() => {
    if (!state) {
      navigate('/assessment', { replace: true });
    }
  }, [state, navigate]);

  // Save to localStorage on first render
  useEffect(() => {
    if (!state) return;
    const { formData, bmiResult, riskResult } = state;
    const heightCm =
      formData.heightUnit === 'cm'
        ? parseFloat(formData.heightCm)
        : convertFeetToCm(
            parseInt(formData.heightFeet, 10),
            parseInt(formData.heightInches || '0', 10),
          );

    const record: AssessmentRecord = {
      id:            generateId(),
      date:          new Date().toISOString(),
      age:           parseInt(formData.age, 10),
      gender:        formData.gender,
      heightCm:      heightCm,
      weightKg:      parseFloat(formData.weightKg),
      bmi:           bmiResult.bmi,
      bmiCategory:   bmiResult.category,
      riskLevel:     riskResult.riskLevel,
      totalScore:    riskResult.totalScore,
      activityLevel: formData.activityLevel,
      smokingStatus: formData.smokingStatus,
      riskFactors:   formData.riskFactors,
      breakdown:     riskResult.breakdown,
    };
    saveRecord(record);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state) return null;

  const { formData, bmiResult, riskResult } = state;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-slide-up">

      {/* ── Top actions ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="page-title mb-1">Your Results</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Assessment completed on {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="btn-secondary text-sm py-2 px-4"
            aria-label="Print results"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <Link to="/history" className="btn-secondary text-sm py-2 px-4">
            <History className="w-4 h-4" />
            History
          </Link>
        </div>
      </div>

      <div className="space-y-6">

        {/* ── BMI Gauge Card ───────────────────────────────────────── */}
        <div className="card p-6 sm:p-8">
          <h2 className="section-title mb-6">Your BMI</h2>
          <BMIGauge bmi={bmiResult.bmi} category={bmiResult.category} />

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 dark:border-slate-700">
            {[
              { label: 'Age',    value: `${formData.age} yrs` },
              { label: 'Gender', value: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) },
              { label: 'Height', value: formData.heightUnit === 'cm' ? `${formData.heightCm} cm` : `${formData.heightFeet}' ${formData.heightInches || '0'}"` },
              { label: 'Weight', value: `${formData.weightKg} kg` },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Risk Indicator ───────────────────────────────────────── */}
        <RiskIndicator riskLevel={riskResult.riskLevel} totalScore={riskResult.totalScore} />

        {/* ── Breakdown ────────────────────────────────────────────── */}
        <div className="card p-6">
          <RiskBreakdown breakdown={riskResult.breakdown} totalScore={riskResult.totalScore} />
        </div>

        {/* ── Recommendations ──────────────────────────────────────── */}
        <div className="card p-6">
          <RecommendationCard
            riskLevel={riskResult.riskLevel}
            bmiCategory={bmiResult.category}
            activityLevel={formData.activityLevel}
          />
        </div>

        {/* ── Disclaimer ───────────────────────────────────────────── */}
        <Disclaimer />

        {/* ── Bottom actions ───────────────────────────────────────── */}
        <div className="flex gap-3 flex-wrap no-print">
          <Link to="/assessment" className="btn-primary">
            <RotateCcw className="w-4 h-4" />
            Recalculate
          </Link>
          <Link to="/" className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
