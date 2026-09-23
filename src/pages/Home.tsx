import { Link } from 'react-router-dom';
import { Activity, Calculator, ShieldCheck, History, ChevronRight, Lock, BookOpen, TrendingUp } from 'lucide-react';
import Disclaimer from '../components/Disclaimer';

const features = [
  {
    icon: Calculator,
    title: 'Standard BMI Calculation',
    desc: 'Uses the scientifically established formula: weight (kg) ÷ height (m)². Results are rounded to one decimal place.',
  },
  {
    icon: TrendingUp,
    title: 'Transparent Risk Scoring',
    desc: 'A clear rule-based scoring system that shows exactly which factors contributed to your indicator and why.',
  },
  {
    icon: History,
    title: 'Assessment History',
    desc: 'Your past assessments are saved securely in your browser\'s localStorage — never sent to any server.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy First',
    desc: 'Zero backend. All data stays in your browser. No accounts, no tracking, no external API calls.',
  },
];

const steps = [
  {
    num: '1',
    title: 'Enter Your Details',
    desc: 'Provide your age, gender, height, weight, and basic lifestyle information.',
  },
  {
    num: '2',
    title: 'View Your BMI',
    desc: 'See your BMI value, category, and position on the visual gauge.',
  },
  {
    num: '3',
    title: 'Understand Your Indicators',
    desc: 'Review the transparent educational risk breakdown and general suggestions.',
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-teal-500 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            B.Tech IT Mini Project — Educational Tool
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Understand Your BMI.<br />
            <span className="text-teal-200">Understand Your Health.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-primary-100 mb-10 leading-relaxed">
            An educational BMI calculator and transparent lifestyle risk indicator. Enter your details to see your BMI category, an honest risk score breakdown, and general health suggestions — all calculated right in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment" id="cta-start-assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl text-lg hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Assessment
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/about" id="cta-how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl text-lg hover:bg-white/20 transition-all duration-200">
              <BookOpen className="w-5 h-5" />
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-3">What this tool does</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            A transparent, open educational assessment with no hidden calculations.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card card-hover p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works (3 steps) ───────────────────────────────────── */}
      <section className="bg-slate-100 dark:bg-slate-800/50 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-3">Three simple steps</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12">No sign-up required. No data leaves your browser.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="relative">
                {/* Connector line */}
                {num !== '3' && (
                  <div className="hidden sm:block absolute top-6 left-1/2 w-full h-0.5 bg-primary-200 dark:bg-primary-800 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                    {num}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">{title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/assessment" className="btn-primary mx-auto inline-flex">
              <Activity className="w-4 h-4" />
              Begin Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Privacy statement ─────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="card p-6 flex items-start gap-4">
          <Lock className="w-8 h-8 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Your Privacy</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Your assessment information is stored locally in your browser and is not sent to a server by this application.</strong>{' '}
              We do not use any backend server, database, external analytics, or third-party tracking. All computation happens on your device. You can clear your history at any time from the History page.
            </p>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <Disclaimer />
      </section>
    </div>
  );
}
