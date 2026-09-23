// ─── Assessment Form ─────────────────────────────────────────────────────────

export interface AssessmentFormData {
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  heightUnit: 'cm' | 'feet';
  heightCm: string;
  heightFeet: string;
  heightInches: string;
  weightKg: string;
  activityLevel: 'sedentary' | 'lightly' | 'moderately' | 'very' | '';
  smokingStatus: 'never' | 'former' | 'current' | '';
  riskFactors: string[];
}

export type ValidationErrors = Partial<Record<keyof AssessmentFormData, string>>;

// ─── BMI ─────────────────────────────────────────────────────────────────────

export type BMICategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obesity';

export interface BMIResult {
  bmi: number;
  category: BMICategory;
}

// ─── Risk ─────────────────────────────────────────────────────────────────────

export type RiskLevel = 'Lower' | 'Moderate' | 'Higher';

export interface RiskBreakdownItem {
  factor: string;
  value: string;
  points: number;
}

export interface RiskResult {
  totalScore: number;
  riskLevel: RiskLevel;
  breakdown: RiskBreakdownItem[];
}

// ─── History ──────────────────────────────────────────────────────────────────

export interface AssessmentRecord {
  id: string;
  date: string; // ISO string
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bmiCategory: BMICategory;
  riskLevel: RiskLevel;
  totalScore: number;
  activityLevel: string;
  smokingStatus: string;
  riskFactors: string[];
  breakdown: RiskBreakdownItem[];
}

// ─── Navigation state passed to Results page ─────────────────────────────────

export interface ResultsNavState {
  formData: AssessmentFormData;
  bmiResult: BMIResult;
  riskResult: RiskResult;
}
