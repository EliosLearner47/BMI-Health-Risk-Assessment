import { BMIResult, BMICategory } from '../types';

/**
 * Calculate BMI from weight and height.
 * @param weightKg - Weight in kilograms (must be positive)
 * @param heightCm - Height in centimetres (must be positive)
 * @returns BMIResult with rounded bmi and category string
 */
export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Height and weight must be positive numbers.');
  }
  const heightM = heightCm / 100;
  const raw = weightKg / (heightM * heightM);
  const bmi = Math.round(raw * 10) / 10;

  let category: BMICategory;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25.0) category = 'Normal';
  else if (bmi < 30.0) category = 'Overweight';
  else category = 'Obesity';

  return { bmi, category };
}

/**
 * Convert feet + inches to centimetres.
 */
export function convertFeetToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

/**
 * Return the colour token for a given BMI category.
 */
export function categoryColor(category: BMICategory): string {
  switch (category) {
    case 'Underweight': return 'blue';
    case 'Normal':      return 'green';
    case 'Overweight':  return 'amber';
    case 'Obesity':     return 'red';
    default:            return 'slate';
  }
}

/**
 * Return the percentage position (0–100) of a BMI value on the gauge.
 * Range mapped: 10–45 → 0%–100%
 */
export function bmiToGaugePercent(bmi: number): number {
  const min = 10;
  const max = 45;
  return Math.min(100, Math.max(0, ((bmi - min) / (max - min)) * 100));
}
