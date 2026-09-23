import { Link } from 'react-router-dom';
import { Activity, Github, Shield } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-auto transition-colors duration-300 print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-primary-700 dark:text-primary-400 font-bold mb-3">
              <Activity className="w-5 h-5" />
              <span>BMI Health</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An educational BMI and lifestyle health-risk indicator. Not a medical device.
            </p>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Pages</h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              {[['/', 'Home'], ['/assessment', 'Assessment'], ['/history', 'History'], ['/about', 'About']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Privacy */}
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              <Shield className="w-4 h-4 text-green-500" />
              Privacy
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your assessment data is stored <strong>locally in your browser</strong> and is never sent to any server.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {year} BMI Health Risk Assessment System · B.Tech IT Mini Project
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
            ⚠️ Educational tool only — not a substitute for medical advice.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="GitHub repository"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
