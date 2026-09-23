import { AlertTriangle } from 'lucide-react';

interface DisclaimerProps {
  compact?: boolean;
}

export default function Disclaimer({ compact = false }: DisclaimerProps) {
  if (compact) {
    return (
      <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-700 dark:text-amber-400">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Educational tool only.</strong> This application is not a medical device and does not diagnose, treat, or predict any disease. Results are based on a simple educational rule-based scoring system and are <strong>not medically validated</strong>. Always consult a qualified healthcare professional for health concerns.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 border-l-4 border-l-amber-400 bg-amber-50/50 dark:bg-amber-900/10">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-2">Medical Disclaimer</h3>
          <div className="text-sm text-amber-700 dark:text-amber-300 space-y-2">
            <p>
              This application is an <strong>educational tool created for a B.Tech IT mini project</strong>. It is intended solely to demonstrate how BMI is calculated and how a simple rule-based scoring system can be constructed.
            </p>
            <p>
              The health-risk indicator presented here is <strong>not a medically validated prediction model</strong> and should <strong>not</strong> be used to:
            </p>
            <ul className="list-disc ml-4 space-y-1">
              <li>Diagnose any medical condition</li>
              <li>Replace professional medical advice</li>
              <li>Guide medical treatment decisions</li>
              <li>Predict your actual future health outcomes</li>
            </ul>
            <p className="font-medium">
              If you have concerns about your health, please consult a qualified and registered healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
