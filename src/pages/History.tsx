import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Shield } from 'lucide-react';
import { AssessmentRecord } from '../types';
import { getHistory, deleteRecord, clearHistory } from '../utils/storage';
import HistoryTable from '../components/HistoryTable';

export default function History() {
  const [records, setRecords] = useState<AssessmentRecord[]>([]);

  useEffect(() => {
    setRecords(getHistory());
  }, []);

  const handleDelete = (id: string) => {
    deleteRecord(id);
    setRecords(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setRecords([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-slide-up">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="w-7 h-7 text-primary-600 dark:text-primary-400" />
          <h1 className="page-title">Assessment History</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400">
          Your past assessments are saved locally in your browser. They are never sent to any server.
        </p>
      </div>

      {/* Privacy note */}
      <div className="flex items-start gap-3 p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-700 dark:text-green-400">
        <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Privacy:</strong> Your assessment information is stored locally in your browser and is not sent to a server by this application.
        </p>
      </div>

      {/* Table / Empty state */}
      <HistoryTable records={records} onDelete={handleDelete} onClearAll={handleClearAll} />

      {/* CTA if no records */}
      {records.length === 0 && (
        <div className="text-center mt-6">
          <Link to="/assessment" className="btn-primary mx-auto inline-flex">
            Take Your First Assessment
          </Link>
        </div>
      )}
    </div>
  );
}
