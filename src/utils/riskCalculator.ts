import { RiskResult, RiskBreakdownItem, RiskLevel, BMICategory } from '../types';

interface RiskInput {
  bmiCategory: BMICategory;
  activityLevel: string;
  smokingStatus: string;
  riskFactors: string[];
}

const activityLabels: Record<string, string> = {
  sedentary:   'Sedentary',
  lightly:     'Lightly Active',
  moderately:  'Moderately Active',
  very:        'Very Active',
};

const smokingLabels: Record<string, string> = {
  never:   'Never Smoked',
  former:  'Former Smoker',
  current: 'Current Smoker',
};

/**
 * Transparent rule-based educational risk indicator.
 *
 * IMPORTANT: This is NOT a medically validated prediction model.
 * It is a simple scoring system for educational purposes only.
 *
 * Scoring table:
 *   BMI: Normal→0  Underweight→1  Overweight→1  Obesity→2
 *   Activity: Very/Moderately→0  Lightly→1  Sedentary→2
 *   Smoking: Never→0  Former→1  Current→2
 *   Each additional risk factor → +1
 *
 *   0–2  → Lower Risk Indicator
 *   3–5  → Moderate Risk Indicator
 *   6+   → Higher Risk Indicator
 */
export function calculateRisk(input: RiskInput): RiskResult {
  const breakdown: RiskBreakdownItem[] = [];
  let totalScore = 0;

  // BMI contribution
  const bmiPoints =
    input.bmiCategory === 'Obesity'     ? 2 :
    input.bmiCategory === 'Overweight'  ? 1 :
    input.bmiCategory === 'Underweight' ? 1 : 0;
  breakdown.push({ factor: 'BMI Category', value: input.bmiCategory, points: bmiPoints });
  totalScore += bmiPoints;

  // Activity contribution
  const activityPoints =
    input.activityLevel === 'sedentary' ? 2 :
    input.activityLevel === 'lightly'   ? 1 : 0;
  breakdown.push({
    factor: 'Physical Activity',
    value: activityLabels[input.activityLevel] ?? input.activityLevel,
    points: activityPoints,
  });
  totalScore += activityPoints;

  // Smoking contribution
  const smokingPoints =
    input.smokingStatus === 'current' ? 2 :
    input.smokingStatus === 'former'  ? 1 : 0;
  breakdown.push({
    factor: 'Smoking Status',
    value: smokingLabels[input.smokingStatus] ?? input.smokingStatus,
    points: smokingPoints,
  });
  totalScore += smokingPoints;

  // Additional risk factors
  const rfPoints = input.riskFactors.length;
  breakdown.push({
    factor: 'Additional Risk Factors',
    value: rfPoints === 0 ? 'None selected' : `${rfPoints} factor${rfPoints > 1 ? 's' : ''} selected`,
    points: rfPoints,
  });
  totalScore += rfPoints;

  // Classify
  const riskLevel: RiskLevel =
    totalScore <= 2 ? 'Lower'    :
    totalScore <= 5 ? 'Moderate' : 'Higher';

  return { totalScore, riskLevel, breakdown };
}
