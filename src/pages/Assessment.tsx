import BMIForm from '../components/BMIForm';
import Disclaimer from '../components/Disclaimer';

export default function Assessment() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-slide-up">
      {/* Header */}
      <div className="mb-8">
        <h1 className="page-title mb-3">BMI & Risk Assessment</h1>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
          Fill in the form below to calculate your BMI and view an educational health-risk indicator.
          All fields marked <span className="text-red-400 font-semibold">*</span> are required.
        </p>
      </div>

      {/* Compact disclaimer */}
      <div className="mb-6">
        <Disclaimer compact />
      </div>

      {/* The form */}
      <BMIForm />
    </div>
  );
}
