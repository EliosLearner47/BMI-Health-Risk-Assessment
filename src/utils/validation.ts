import { AssessmentFormData, ValidationErrors } from '../types';

export function validateForm(data: AssessmentFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Age
  const age = parseInt(data.age, 10);
  if (!data.age.trim()) {
    errors.age = 'Age is required.';
  } else if (isNaN(age) || age < 18 || age > 120) {
    errors.age = 'Please enter a valid age between 18 and 120.';
  }

  // Gender
  if (!data.gender) {
    errors.gender = 'Please select a gender.';
  }

  // Height
  if (data.heightUnit === 'cm') {
    const h = parseFloat(data.heightCm);
    if (!data.heightCm.trim()) {
      errors.heightCm = 'Height is required.';
    } else if (isNaN(h) || h < 50 || h > 272) {
      errors.heightCm = 'Please enter a valid height between 50 cm and 272 cm.';
    }
  } else {
    const feet = parseInt(data.heightFeet, 10);
    const inches = parseInt(data.heightInches || '0', 10);
    if (!data.heightFeet.trim()) {
      errors.heightFeet = 'Height (feet) is required.';
    } else if (isNaN(feet) || feet < 1 || feet > 8) {
      errors.heightFeet = 'Please enter feet between 1 and 8.';
    }
    if (data.heightInches.trim() && (isNaN(inches) || inches < 0 || inches > 11)) {
      errors.heightInches = 'Inches must be between 0 and 11.';
    }
  }

  // Weight
  const w = parseFloat(data.weightKg);
  if (!data.weightKg.trim()) {
    errors.weightKg = 'Weight is required.';
  } else if (isNaN(w) || w < 10 || w > 500) {
    errors.weightKg = 'Please enter a valid weight between 10 kg and 500 kg.';
  }

  // Activity level
  if (!data.activityLevel) {
    errors.activityLevel = 'Please select an activity level.';
  }

  // Smoking status
  if (!data.smokingStatus) {
    errors.smokingStatus = 'Please select your smoking status.';
  }

  return errors;
}

export function isFormValid(errors: ValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
