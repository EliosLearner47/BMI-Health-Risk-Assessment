import React from 'react';
import { RiskLevel } from '../types';
import { Dumbbell, Apple, Scale, Stethoscope } from 'lucide-react';

interface RecommendationCardProps {
  riskLevel: RiskLevel;
  bmiCategory: string;
  activityLevel: string;
}

interface Rec {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function getRecommendations(riskLevel: RiskLevel, bmiCategory: string, activityLevel: string): Rec[] {
  const recs: Rec[] = [];

  // Activity-based
  if (activityLevel === 'sedentary' || activityLevel === 'lightly') {
    recs.push({
      icon: Dumbbell,
      title: 'Increase Physical Activity',
      description: 'Aim for at least 150 minutes of moderate-intensity aerobic activity per week, as recommended by health guidelines. Even small increases in daily movement are beneficial.',
    });
  } else {
    recs.push({
      icon: Dumbbell,
      title: 'Maintain Your Active Lifestyle',
      description: 'You are doing well with physical activity. Continue with regular exercise and consider mixing aerobic activity with strength training.',
    });
  }

  // BMI-based
  if (bmiCategory === 'Underweight') {
    recs.push({
      icon: Apple,
      title: 'Focus on Balanced Nutrition',
      description: 'Being underweight can indicate nutritional deficiencies. Consider consulting a registered dietitian to develop a balanced eating plan that supports healthy weight gain.',
    });
  } else if (bmiCategory === 'Normal') {
    recs.push({
      icon: Apple,
      title: 'Maintain a Balanced Diet',
      description: 'A varied diet rich in vegetables, fruits, whole grains, lean proteins, and healthy fats supports overall health. Continue your current healthy habits.',
    });
  } else {
    recs.push({
      icon: Apple,
      title: 'Review Your Diet',
      description: 'A balanced diet with controlled portions, rich in whole foods and low in ultra-processed foods, can support healthy weight management over time.',
    });
  }

  // Weight monitoring
  recs.push({
    icon: Scale,
    title: 'Monitor Weight Periodically',
    description: 'Tracking your weight over time can help you identify trends early. Small, sustainable lifestyle changes are more effective than drastic measures.',
  });

  // Professional advice for moderate/higher
  if (riskLevel === 'Moderate' || riskLevel === 'Higher') {
    recs.push({
      icon: Stethoscope,
      title: 'Consider Consulting a Healthcare Professional',
      description: 'Based on this educational assessment, some of your selected factors may benefit from professional evaluation. A doctor can provide personalised guidance based on your complete medical history.',
    });
  }

  return recs;
}

export default function RecommendationCard({ riskLevel, bmiCategory, activityLevel }: RecommendationCardProps) {
  const recs = getRecommendations(riskLevel, bmiCategory, activityLevel);

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">General Educational Suggestions</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        These are general educational suggestions only and do not constitute medical advice.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {recs.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.title}
              className="card card-hover p-4 flex gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-1">{rec.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{rec.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
