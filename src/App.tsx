import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import History from './pages/History';
import About from './pages/About';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/results"    element={<Results />} />
          <Route path="/history"    element={<History />} />
          <Route path="/about"      element={<About />} />
          {/* Catch-all → Home */}
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
