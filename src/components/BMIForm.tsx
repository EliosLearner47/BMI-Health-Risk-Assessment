import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Ruler, Activity, Cigarette, HeartPulse, AlertCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { AssessmentFormData, ValidationErrors, ResultsNavState } from '../types';
import { validateForm, isFormValid } from '../utils/validation';
import { calculateBMI, convertFeetToCm } from '../utils/bmiCalculator';
import { calculateRisk } from '../utils/riskCalculator';

const INITIAL_FORM: AssessmentFormData = {
  age: '',
  gender: '',
  heightUnit: 'cm',
  heightCm: '',
  heightFeet: '',
  heightInches: '',
  weightKg: '',
  activityLevel: '',
  smokingStatus: '',
  riskFactors: [],
};

const RISK_FACTOR_OPTIONS = [
  { id: 'hypertension',    label: 'High Blood Pressure', desc: 'Diagnosed or currently on medication for hypertension' },
  { id: 'diabetes',        label: 'Diabetes',            desc: 'Type 1, Type 2, or pre-diabetes' },
  { id: 'cholesterol',     label: 'High Cholesterol',    desc: 'Diagnosed high LDL or total cholesterol' },
  { id: 'family_heart',    label: 'Family History of Cardiovascular Disease', desc: 'Close relatives with heart disease or stroke' },
];

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="error-msg" role="alert">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {error}
    </p>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ComponentType<{ className?: string }>; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
      <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
      </div>
      <div>
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">{title}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

export default function BMIForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<AssessmentFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);

  /* ── helpers ─────────────────────────────────────────────────────────── */

  const set = (field: keyof AssessmentFormData, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (submitted) {
        setErrors(validateForm(updated));
      }
      return updated;
    });
  };

  const toggleRiskFactor = (id: string) => {
    setForm((f) => {
      const rf = f.riskFactors.includes(id)
        ? f.riskFactors.filter((r) => r !== id)
        : [...f.riskFactors, id];
      return { ...f, riskFactors: rf };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateForm(form);
    setErrors(errs);
    if (!isFormValid(errs)) return;

    try {
      // Resolve height to cm
      const heightCm =
        form.heightUnit === 'cm'
          ? parseFloat(form.heightCm)
          : convertFeetToCm(parseInt(form.heightFeet, 10), parseInt(form.heightInches || '0', 10));

      const weightKg = parseFloat(form.weightKg);
      const bmiResult = calculateBMI(weightKg, heightCm);
      const riskResult = calculateRisk({
        bmiCategory:   bmiResult.category,
        activityLevel: form.activityLevel,
        smokingStatus: form.smokingStatus,
        riskFactors:   form.riskFactors,
      });

      const state: ResultsNavState = { formData: form, bmiResult, riskResult };
      navigate('/results', { state });
    } catch (_err) {
      setErrors({ weightKg: 'Calculation error. Please check your inputs.' });
    }
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  /* ── UI ──────────────────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate aria-label="BMI Health Assessment Form" className="space-y-6">

      {/* ── Section 1: Basic Information ─────────────────────────────── */}
      <div className="card p-6">
        <SectionHeader icon={User} title="Basic Information" subtitle="Tell us about yourself" />

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Age */}
          <div>
            <label htmlFor="age" className="label">Age <span className="text-red-400">*</span></label>
            <input
              id="age" type="number" inputMode="numeric"
              className={`input-field ${errors.age ? 'input-error' : ''}`}
              placeholder="e.g. 25"
              value={form.age}
              min={18} max={120}
              onChange={(e) => set('age', e.target.value)}
              aria-describedby={errors.age ? 'age-error' : undefined}
              aria-invalid={!!errors.age}
            />
            <FieldError error={errors.age} />
          </div>

          {/* Gender */}
          <div>
            <label className="label">Gender <span className="text-red-400">*</span></label>
            <div className="grid grid-cols-3 gap-2">
              {([['male', 'Male'], ['female', 'Female'], ['other', 'Other']] as const).map(([val, lbl]) => (
                <label key={val} className={`radio-option ${form.gender === val ? 'radio-option-selected' : ''}`}>
                  <input type="radio" name="gender" value={val} className="sr-only"
                    checked={form.gender === val} onChange={() => set('gender', val)} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200 text-center w-full">{lbl}</span>
                </label>
              ))}
            </div>
            <FieldError error={errors.gender} />
          </div>
        </div>
      </div>

      {/* ── Section 2: Height & Weight ───────────────────────────────── */}
      <div className="card p-6">
        <SectionHeader icon={Ruler} title="Height & Weight" subtitle="Used to calculate your BMI" />

        {/* Height unit toggle */}
        <div className="mb-4">
          <label className="label">Height</label>
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl w-fit mb-3">
            {(['cm', 'feet'] as const).map((u) => (
              <button key={u} type="button"
                onClick={() => setForm((f) => ({ ...f, heightUnit: u }))}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-150 ${
                  form.heightUnit === u
                    ? 'bg-white dark:bg-slate-800 text-primary-700 dark:text-primary-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {u === 'cm' ? 'Centimetres' : 'Feet / Inches'}
              </button>
            ))}
          </div>

          {form.heightUnit === 'cm' ? (
            <div className="max-w-xs">
              <div className="relative">
                <input id="heightCm" type="number" inputMode="decimal"
                  className={`input-field pr-12 ${errors.heightCm ? 'input-error' : ''}`}
                  placeholder="e.g. 170"
                  value={form.heightCm}
                  onChange={(e) => set('heightCm', e.target.value)}
                  aria-label="Height in centimetres"
                  aria-invalid={!!errors.heightCm}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">cm</span>
              </div>
              <FieldError error={errors.heightCm} />
            </div>
          ) : (
            <div className="flex gap-3 max-w-xs">
              <div className="flex-1">
                <div className="relative">
                  <input id="heightFeet" type="number" inputMode="numeric"
                    className={`input-field pr-10 ${errors.heightFeet ? 'input-error' : ''}`}
                    placeholder="5"
                    value={form.heightFeet}
                    onChange={(e) => set('heightFeet', e.target.value)}
                    aria-label="Height feet"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none">ft</span>
                </div>
                <FieldError error={errors.heightFeet} />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input id="heightInches" type="number" inputMode="numeric"
                    className={`input-field pr-10 ${errors.heightInches ? 'input-error' : ''}`}
                    placeholder="7"
                    value={form.heightInches}
                    onChange={(e) => set('heightInches', e.target.value)}
                    aria-label="Height inches"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none">in</span>
                </div>
                <FieldError error={errors.heightInches} />
              </div>
            </div>
          )}
        </div>

        {/* Weight */}
        <div className="max-w-xs">
          <label htmlFor="weightKg" className="label">Weight <span className="text-red-400">*</span></label>
          <div className="relative">
            <input id="weightKg" type="number" inputMode="decimal"
              className={`input-field pr-10 ${errors.weightKg ? 'input-error' : ''}`}
              placeholder="e.g. 70"
              value={form.weightKg}
              onChange={(e) => set('weightKg', e.target.value)}
              aria-invalid={!!errors.weightKg}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none">kg</span>
          </div>
          <FieldError error={errors.weightKg} />
        </div>
      </div>

      {/* ── Section 3: Lifestyle ─────────────────────────────────────── */}
      <div className="card p-6">
        <SectionHeader icon={Activity} title="Lifestyle" subtitle="Your typical daily activity and habits" />

        {/* Physical Activity */}
        <div className="mb-5">
          <label className="label">Physical Activity Level <span className="text-red-400">*</span></label>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { val: 'sedentary',  label: 'Sedentary',          desc: 'Little or no exercise, desk job' },
              { val: 'lightly',    label: 'Lightly Active',     desc: 'Light exercise 1–3 days/week' },
              { val: 'moderately', label: 'Moderately Active',  desc: 'Moderate exercise 3–5 days/week' },
              { val: 'very',       label: 'Very Active',        desc: 'Hard exercise 6–7 days/week' },
            ].map(({ val, label, desc }) => (
              <label key={val} className={`radio-option ${form.activityLevel === val ? 'radio-option-selected' : ''}`}>
                <input type="radio" name="activityLevel" value={val} className="sr-only"
                  checked={form.activityLevel === val}
                  onChange={() => set('activityLevel', val)} />
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${form.activityLevel === val ? 'border-primary-500 bg-primary-500' : 'border-slate-300 dark:border-slate-500'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </label>
            ))}
          </div>
          <FieldError error={errors.activityLevel} />
        </div>

        {/* Smoking */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Cigarette className="w-4 h-4 text-slate-400" />
            <label className="label mb-0">Smoking Status <span className="text-red-400">*</span></label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {([['never', 'Never'], ['former', 'Former'], ['current', 'Current']] as const).map(([val, lbl]) => (
              <label key={val} className={`radio-option justify-center ${form.smokingStatus === val ? 'radio-option-selected' : ''}`}>
                <input type="radio" name="smokingStatus" value={val} className="sr-only"
                  checked={form.smokingStatus === val}
                  onChange={() => set('smokingStatus', val)} />
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${form.smokingStatus === val ? 'border-primary-500 bg-primary-500' : 'border-slate-300 dark:border-slate-500'}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{lbl}</span>
              </label>
            ))}
          </div>
          <FieldError error={errors.smokingStatus} />
        </div>
      </div>

      {/* ── Section 4: Additional Risk Factors ───────────────────────── */}
      <div className="card p-6">
        <SectionHeader icon={HeartPulse} title="Additional Risk Factors" subtitle="Optional — select any that apply to you" />

        <div className="grid sm:grid-cols-2 gap-2">
          {RISK_FACTOR_OPTIONS.map(({ id, label, desc }) => {
            const checked = form.riskFactors.includes(id);
            return (
              <label key={id} className={`checkbox-option ${checked ? 'checkbox-option-selected' : ''}`}>
                <input type="checkbox" className="sr-only"
                  checked={checked}
                  onChange={() => toggleRiskFactor(id)}
                  aria-label={label}
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked ? 'bg-primary-500 border-primary-500' : 'border-slate-300 dark:border-slate-500'}`}>
                  {checked && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </label>
            );
          })}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
          * None of these fields are mandatory. They help refine the educational risk indicator.
        </p>
      </div>

      {/* ── Actions ──────────────────────────────────────────────────── */}
      {submitted && !isFormValid(errors) && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400" role="alert">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          Please fix the errors above before submitting.
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <button type="submit" className="btn-primary flex-1 sm:flex-none justify-center">
          Calculate BMI & Risk
          <ChevronRight className="w-4 h-4" />
        </button>
        <button type="button" onClick={reset} className="btn-secondary">
          <RotateCcw className="w-4 h-4" />
          Reset Form
        </button>
      </div>
    </form>
  );
}
