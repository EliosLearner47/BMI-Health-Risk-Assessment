import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { to: '/',           label: 'Home' },
  { to: '/assessment', label: 'Assessment' },
  { to: '/history',    label: 'History' },
  { to: '/about',      label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-primary-700 dark:text-primary-400 font-bold text-lg hover:opacity-80 transition-opacity" aria-label="BMI Health App — Home">
          <Activity className="w-6 h-6" strokeWidth={2.5} />
          <span className="hidden sm:inline">BMI Health</span>
          <span className="sm:hidden">BMI</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/assessment"
            className="hidden sm:inline-flex btn-primary py-2 px-4 text-sm"
          >
            Start Assessment
          </Link>
          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-fade-in"
        >
          <ul className="flex flex-col p-3 gap-1" role="list">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/assessment"
                onClick={() => setOpen(false)}
                className="block btn-primary text-center mt-2"
              >
                Start Assessment
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
